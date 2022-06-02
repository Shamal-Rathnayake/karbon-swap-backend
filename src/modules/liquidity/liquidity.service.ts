import LiquidityModel from "./liquidity.model";
import * as repository from "../../services/repository.service";
import { getUserFromId } from "../user/user.service";
import userModel from "../user/user.model";
import mongoose from "mongoose";
import { addReward } from "../liquidityRewards/liquidityReward.controller";
import BigNumber from "bignumber.js";
import config from "../../config/config";

export const addLiquidity = async (body) => {
  const { transactionHash, blockHash, blockNumber, address, returnValues } = body;
  const {
    from,
    receivedAmount,
    isFull,
    sentAmount,
    stakeBalance,
    timestamp,
    startValue,
    endValue,
    userId,
  } = returnValues.liquidityStructObj;

  const existingUser = await getUserFromId(userId);
  if (!existingUser) throw new Error("Invalid user id");

  const existingRecord = await getRecordByTxHash(transactionHash);
  if (existingRecord) throw new Error("Record already exists");

  const liquidityRecord = new LiquidityModel({
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

  const savedRecord = await repository.save(liquidityRecord);

  if (!isFull) await issueReward(userId, sentAmount, savedRecord._id);
};

const issueReward = async (userId, commission, recordId) => {
  const docs = await repository.findByAggregateQuery(userModel, [
    {
      $match: {
        _id: new mongoose.Types.ObjectId(userId),
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
      if (parent.deleteDate) break;
      const reward = parseInt(
        new BigNumber(commission)
          .multipliedBy(config.refReward[`level${i + 1}`])
          .div(100)
          .toFixed()
      );
      await addReward({
        userId: parent._id,
        recordId,
        reward,
        percentage: config.refReward[`level${i + 1}`],
        level: i + 1,
      });
    }
  }
};

const getRecordByTxHash = async (hash: string) => {
  return repository.findOne(LiquidityModel, {
    transactionHash: hash,
  });
};
