import * as mongoose from "mongoose";
import { ILiquidityRewardMongoose } from "./liquidityReward.interface";
const { Schema } = mongoose;

const rewardSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    liquidityRecord: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "liquidity_record",
      required: true,
    },
    reward: {
      type: Number,
      required: true,
    },
    percentage: {
      type: Number,
      required: true,
    },
    level: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ILiquidityRewardMongoose>("liquidity_reward", rewardSchema);
