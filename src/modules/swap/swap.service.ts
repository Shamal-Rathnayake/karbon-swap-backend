import SwapModel from "./swap.model";
import * as repository from "../../services/repository.service";

export const addSwap = async (body) => {
  const { transactionHash, blockHash, blockNumber, address, returnValues } = body;
  const {
    from,
    isForeignSwap,
    receivedAmount,
    sentAmount,
    commission,
    timestamp,
    startValue,
    endValue,
  } = returnValues.swapStructObj;

  const swapRecord = new SwapModel({
    transactionHash,
    blockHash,
    blockNumber,
    contract: address,
    from,
    isForeignSwap,
    receivedAmount,
    sentAmount,
    commission,
    timestamp,
    previousForeignReserve: startValue.foreignReserve,
    previousNativeReserve: startValue.nativeReserve,
    previousKValue: startValue.kValue,
    latestForeignReserve: endValue.foreignReserve,
    latestNativeReserve: endValue.nativeReserve,
    latestKValue: endValue.kValue,
  });

  await repository.save(swapRecord);
};
