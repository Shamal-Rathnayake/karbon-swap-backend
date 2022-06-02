export interface ISwapReward {
  _id: string;
  userId: string;
  swapRecord: string;
  share: number;
  reward: number;
  balance: number;
}
export interface ISwapRewardMongoose extends ISwapReward, Document {}
