export interface IReward {
  _id: string;
  userId: string;
  liquidityRecord: string;
  reward: number;
  percentage: number;
  level: number;
}
export interface IRewardMongoose extends IReward, Document {}
