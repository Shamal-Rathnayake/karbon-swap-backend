import SwapModel from "./swap.model";
import * as repository from "../../services/repository.service";
import swapModel from "./swap.model";
import liquidityModel from "../liquidity/liquidity.model";
import BigNumber from "bignumber.js";
import { addReward } from "../swapRewards/swapReward.controller";

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

  const existingRecord = await getRecordByTxHash(transactionHash);
  if (existingRecord) throw new Error("Record already exists");

  let swapRecord = new SwapModel({
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

  swapRecord = await repository.save(swapRecord);

  const stakeData = await getStakeData();
  if (!stakeData) throw new Error();

  const { stakers, totalStakeBalance } = stakeData;

  for (let i = 0; i < stakers.length; i++) {
    const staker = stakers[i];

    const stakeShare = new BigNumber(staker.stakeBalance)
      .multipliedBy(100)
      .dividedBy(new BigNumber(totalStakeBalance));

    const stakeReward = new BigNumber(commission).multipliedBy(stakeShare).dividedBy(100);

    const rewardObj = {
      userId: staker._id,
      recordId: swapRecord._id,
      share: parseInt(stakeShare.toFixed()),
      reward: parseInt(stakeReward.toFixed()),
      balance: staker.stakeBalance,
    };

    await addReward(rewardObj);
  }
};

const getRecordByTxHash = async (hash: string) => {
  return repository.findOne(swapModel, {
    transactionHash: hash,
  });
};

const getStakeData = async () => {
  const stakeData = await repository.findByAggregateQuery(liquidityModel, [
    {
      $facet: {
        stakers: [
          {
            $group: {
              _id: "$userId",
              transactions: {
                $push: "$$ROOT",
              },
              stakeBalance: {
                $sum: {
                  $cond: {
                    if: "$isFull",
                    then: "$receivedAmount",
                    else: {
                      $divide: ["$receivedAmount", 2],
                    },
                  },
                },
              },
            },
          },
        ],
        totalStakeBalance: [
          {
            $group: {
              _id: "",
              totalStakeBalance: {
                $sum: {
                  $cond: {
                    if: "$isFull",
                    then: "$receivedAmount",
                    else: {
                      $divide: ["$receivedAmount", 2],
                    },
                  },
                },
              },
            },
          },
        ],
      },
    },
    {
      $unwind: {
        path: "$totalStakeBalance",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        stakers: "$stakers",
        totalStakeBalance: "$totalStakeBalance.totalStakeBalance",
      },
    },
  ]);

  return stakeData.length > 0 ? stakeData[0] : null;
};
