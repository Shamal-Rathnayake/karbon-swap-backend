export interface ILiquidityReward {
  _id: string;
  userId: string;
  liquidityRecord: string;
  reward: number;
  percentage: number;
  level: number;
}
export interface ILiquidityRewardMongoose extends ILiquidityReward, Document {}
