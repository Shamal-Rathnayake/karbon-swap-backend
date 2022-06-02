import Web3 from "web3";
import { AbiItem } from "web3-utils";
import "dotenv/config";
import config from "../config/config";
import ABI from "../config/abi.config";
import { addLiquidity } from "../modules/liquidity/liquidity.controller";
import { addSwap } from "../modules/swap/swap.controller";
import { updateWithdrawal } from "../modules/withdraw/withdraw.controller";

export const httpWeb3 = new Web3(new Web3.providers.HttpProvider(process.env.HTTP_HOST as string));

export default async () => {
  const socketWeb3 = new Web3(
    new Web3.providers.WebsocketProvider(process.env.WEBSOCKET_HOST as string)
  );

  const contract = createContract(socketWeb3);
  await initLiquiditySubscription(contract);
  await initSwapSubscription(contract);
  await initWithdrawSubscription(contract);
};

export const createContract = (socketWeb3) => {
  return new socketWeb3.eth.Contract(ABI.poolContract as AbiItem[], config.poolContractAddress);
};

const initLiquiditySubscription = async (contract) => {
  try {
    const subscription = await contract.events.addLiquidityEvent({ fromBlock: "latest" });

    subscription.on("connected", (subId) => {
      console.log("-----------------------------------------");
      console.log("Liquidity subscription connected", subId);
      console.log("-----------------------------------------");
    });

    subscription.on("data", async (event) => {
      await addLiquidity(event);
    });

    subscription.on("error", (error) => {
      console.log("-----------------------------------------");
      console.log("Liquidity subscription error", error);
      console.log("-----------------------------------------");
    });
  } catch (error) {
    console.log(error);
  }
};

const initSwapSubscription = async (contract) => {
  try {
    const subscription = await contract.events.swapEvent({ fromBlock: "latest" });

    subscription.on("connected", (subId) => {
      console.log("-----------------------------------------");
      console.log("Swap subscription connected", subId);
      console.log("-----------------------------------------");
    });

    subscription.on("data", async (event) => {
      await addSwap(event);
    });

    subscription.on("error", (error) => {
      console.log("-----------------------------------------");
      console.log("Swap subscription error", error);
      console.log("-----------------------------------------");
    });
  } catch (error) {
    console.log(error);
  }
};

const initWithdrawSubscription = async (contract) => {
  try {
    const subscription = await contract.events.withdrawalEvent({ fromBlock: "latest" });

    subscription.on("connected", (subId) => {
      console.log("-----------------------------------------");
      console.log("Withdrawal subscription connected", subId);
      console.log("-----------------------------------------");
    });

    subscription.on("data", async (event) => {
      await updateWithdrawal(event);
    });

    subscription.on("error", (error) => {
      console.log("-----------------------------------------");
      console.log("Withdrawal subscription error", error);
      console.log("-----------------------------------------");
    });
  } catch (error) {
    console.log(error);
  }
};
