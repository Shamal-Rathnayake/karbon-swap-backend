"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const web3_1 = __importDefault(require("web3"));
require("dotenv/config");
const config_1 = __importDefault(require("../config/config"));
const abi_config_1 = __importDefault(require("../config/abi.config"));
const liquidity_controller_1 = require("../modules/liquidity/liquidity.controller");
const swap_controller_1 = require("../modules/swap/swap.controller");
exports.default = () => __awaiter(void 0, void 0, void 0, function* () {
    const socketWeb3 = new web3_1.default(new web3_1.default.providers.WebsocketProvider(process.env.WEBSOCKET_HOST));
    const contract = createContract(socketWeb3);
    yield initLiquiditySubscription(contract);
    yield initSwapSubscription(contract);
});
const createContract = (socketWeb3) => {
    return new socketWeb3.eth.Contract(abi_config_1.default.poolContract, config_1.default.poolContractAddress);
};
const initLiquiditySubscription = (contract) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subscription = yield contract.events.addLiquidityEvent({ fromBlock: "latest" });
        subscription.on("connected", (subId) => {
            console.log("-----------------------------------------");
            console.log("Liquidity subscription connected", subId);
            console.log("-----------------------------------------");
        });
        subscription.on("data", (event) => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, liquidity_controller_1.addLiquidity)(event);
        }));
        subscription.on("error", (error) => {
            console.log("-----------------------------------------");
            console.log("Liquidity subscription error", error);
            console.log("-----------------------------------------");
        });
    }
    catch (error) {
        console.log(error);
    }
});
const initSwapSubscription = (contract) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subscription = yield contract.events.swapEvent({ fromBlock: "latest" });
        subscription.on("connected", (subId) => {
            console.log("-----------------------------------------");
            console.log("Swap subscription connected", subId);
            console.log("-----------------------------------------");
        });
        subscription.on("data", (event) => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, swap_controller_1.addSwap)(event);
        }));
        subscription.on("error", (error) => {
            console.log("-----------------------------------------");
            console.log("Swap subscription error", error);
            console.log("-----------------------------------------");
        });
    }
    catch (error) {
        console.log(error);
    }
});
