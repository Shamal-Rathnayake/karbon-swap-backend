export interface IWithdraw {
  _id: string;
  transactionHash: string;
  blockHash: string;
  blockNumber: number;
  contract: string;
  userId: string;
  amount: number;
  remainingBalance: number;
  receiver: string;
  timestamp: number;
  previousForeignReserve: number;
  previousNativeReserve: number;
  previousKValue: number;
  latestForeignReserve: number;
  latestNativeReserve: number;
  latestKValue: number;
  confirmed: boolean;
}
export interface IWithdrawMongoose extends IWithdraw, Document {}
