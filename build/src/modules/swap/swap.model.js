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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = __importStar(require("mongoose"));
const { Schema } = mongoose;
const swapSchema = new Schema({
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
}, {
    timestamps: true,
});
exports.default = mongoose.model("swap_record", swapSchema);