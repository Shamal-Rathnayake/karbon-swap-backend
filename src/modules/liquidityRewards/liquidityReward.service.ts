import { getUserFromId } from "../user/user.service";
import rewardModel from "./liquidityReward.model";
import * as repository from "../../services/repository.service";

export const addReward = async (body) => {
  const { userId, recordId, reward, percentage, level } = body;

  const existingUser = await getUserFromId(userId);
  if (!existingUser) throw new Error("Invalid user id");

  const rewardRecord = new rewardModel({
    userId,
    liquidityRecord: recordId,
    reward,
    percentage,
    level,
  });

  await repository.save(rewardRecord);
};
