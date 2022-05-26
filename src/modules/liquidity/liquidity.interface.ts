export interface ILiquidity {
  _id: string;
  transactionHash: string;
  blockHash: string;
  blockNumber: number;
  contract: string;
  from: string;
  receivedAmount: number;
  isFull: boolean;
  sentAmount: number;
  stakeBalance: number;
  timestamp: number;
  previousForeignReserve: number;
  previousNativeReserve: number;
  previousKValue: number;
  latestForeignReserve: number;
  latestNativeReserve: number;
  latestKValue: number;
  userId: string;
}
export interface ILiquidityMongoose extends ILiquidity, Document {}
