import * as mongoose from "mongoose";
import { IWithdrawMongoose } from "./withdraw.interface";
const { Schema } = mongoose;

const withdrawSchema = new Schema(
  {
    transactionHash: {
      type: String,
      default: "",
    },
    blockHash: {
      type: String,
      default: "",
    },
    blockNumber: {
      type: Number,
      default: 0,
    },
    contract: {
      type: String,
      default: "",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    remainingBalance: {
      type: Number,
      required: true,
    },
    receiver: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Number,
      default: 0,
    },
    previousForeignReserve: {
      type: Number,
      default: 0,
    },
    previousNativeReserve: {
      type: Number,
      default: 0,
    },
    previousKValue: {
      type: Number,
      default: 0,
    },
    latestForeignReserve: {
      type: Number,
      default: 0,
    },
    latestNativeReserve: {
      type: Number,
      default: 0,
    },
    latestKValue: {
      type: Number,
      default: 0,
    },
    confirmed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IWithdrawMongoose>("withdrawal", withdrawSchema);
