import * as mongoose from "mongoose";
import { ISwapRewardMongoose } from "./swapReward.interface";
const { Schema } = mongoose;

const rewardSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    swapRecord: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "swap_record",
      required: true,
    },
    share: {
      type: Number,
      required: true,
    },
    reward: {
      type: Number,
      required: true,
    },
    balance: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ISwapRewardMongoose>("swap_reward", rewardSchema);
