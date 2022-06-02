import * as mongoose from "mongoose";
import { ILiquidityMongoose } from "./liquidity.interface";
const { Schema } = mongoose;

const liquiditySchema = new Schema(
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
    receivedAmount: {
      type: Number,
      required: true,
    },
    isFull: {
      type: Boolean,
      required: true,
    },
    sentAmount: {
      type: Number,
      required: true,
    },
    stakeBalance: {
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
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ILiquidityMongoose>("liquidity_record", liquiditySchema);
