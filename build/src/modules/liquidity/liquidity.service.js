"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.addLiquidity = void 0;
const liquidity_model_1 = __importDefault(require("./liquidity.model"));
const repository = __importStar(require("../../services/repository.service"));
const user_service_1 = require("../user/user.service");
const user_model_1 = __importDefault(require("../user/user.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const reward_controller_1 = require("../rewards/reward.controller");
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const config_1 = __importDefault(require("../../config/config"));
const addLiquidity = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const { transactionHash, blockHash, blockNumber, address, returnValues } = body;
    const { from, receivedAmount, isFull, sentAmount, stakeBalance, timestamp, startValue, endValue, userId, } = returnValues.liquidityStructObj;
    const existingUser = yield (0, user_service_1.getUserFromId)(userId);
    if (!existingUser)
        throw new Error("Invalid user id");
    const liquidityRecord = new liquidity_model_1.default({
        transactionHash,
        blockHash,
        blockNumber,
        contract: address,
        from,
        receivedAmount,
        isFull,
        sentAmount,
        stakeBalance,
        timestamp,
        previousForeignReserve: startValue.foreignReserve,
        previousNativeReserve: startValue.nativeReserve,
        previousKValue: startValue.kValue,
        latestForeignReserve: endValue.foreignReserve,
        latestNativeReserve: endValue.nativeReserve,
        latestKValue: endValue.kValue,
        userId,
    });
    const savedRecord = yield repository.save(liquidityRecord);
    if (!isFull)
        yield issueReward(userId, sentAmount, savedRecord._id);
});
exports.addLiquidity = addLiquidity;
const issueReward = (userId, commission, recordId) => __awaiter(void 0, void 0, void 0, function* () {
    const docs = yield repository.findByAggregateQuery(user_model_1.default, [
        {
            $match: {
                _id: new mongoose_1.default.Types.ObjectId(userId),
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "referer",
                foreignField: "_id",
                as: "parent1",
            },
        },
        {
            $unwind: {
                path: "$parent1",
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "parent1.referer",
                foreignField: "_id",
                as: "parent2",
            },
        },
        {
            $unwind: {
                path: "$parent2",
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "parent2.referer",
                foreignField: "_id",
                as: "parent3",
            },
        },
        {
            $unwind: {
                path: "$parent3",
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "parent3.referer",
                foreignField: "_id",
                as: "parent4",
            },
        },
        {
            $unwind: {
                path: "$parent4",
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "parent4.referer",
                foreignField: "_id",
                as: "parent5",
            },
        },
        {
            $unwind: {
                path: "$parent5",
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $project: {
                child: "$$ROOT",
                parents: ["$parent1", "$parent2", "$parent3", "$parent4", "$parent5"],
            },
        },
    ]);
    if (docs.length > 0 && docs[0]) {
        for (let i = 0; i < docs[0].parents.length; i++) {
            const parent = docs[0].parents[i];
            if (parent.deleteDate)
                break;
            const reward = parseInt(new bignumber_js_1.default(commission)
                .multipliedBy(config_1.default.refReward[`level${i + 1}`])
                .div(100)
                .toFixed());
            yield (0, reward_controller_1.addReward)({
                userId: parent._id,
                recordId,
                reward,
                percentage: config_1.default.refReward[`level${i + 1}`],
                level: i + 1,
            });
        }
    }
});
