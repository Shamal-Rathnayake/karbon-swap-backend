export interface ISwap {
  _id: string;
  transactionHash: string;
  blockHash: string;
  blockNumber: number;
  contract: string;
  from: string;
  isForeignSwap: boolean;
  receivedAmount: number;
  sentAmount: number;
  commission: number;
  timestamp: number;
  previousForeignReserve: number;
  previousNativeReserve: number;
  previousKValue: number;
  latestForeignReserve: number;
  latestNativeReserve: number;
  latestKValue: number;
}
export interface ISwapMongoose extends ISwap, Document {}
