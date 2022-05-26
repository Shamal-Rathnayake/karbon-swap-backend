import * as mongoose from "mongoose";
import { ISwapMongoose } from "./swap.interface";

const { Schema } = mongoose;

const swapSchema = new Schema(
  {
    transactionHash: {
      type: String,
      required: true,
    },
    blockHash: {
      type: String,
      required: true,
    },
    blockNumber: {
      type: Number,
      required: true,
    },
    contract: {
      type: String,
      required: true,
    },
    from: {
      type: String,
      required: true,
    },
    isForeignSwap: {
      type: Boolean,
      required: true,
    },
    receivedAmount: {
      type: Number,
      required: true,
    },
    sentAmount: {
      type: Number,
      required: true,
    },
    commission: {
      type: Number,
      required: true,
    },
    timestamp: {
      type: Number,
      required: true,
    },
    previousForeignReserve: {
      type: Number,
      required: true,
    },
    previousNativeReserve: {
      type: Number,
      required: true,
    },
    previousKValue: {
      type: Number,
      required: true,
    },
    latestForeignReserve: {
      type: Number,
      required: true,
    },
    latestNativeReserve: {
      type: Number,
      required: true,
    },
    latestKValue: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ISwapMongoose>("swap_record", swapSchema);
