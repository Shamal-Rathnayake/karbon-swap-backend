import { getUserFromId } from "../user/user.service";
import rewardModel from "./swapReward.model";
import * as repository from "../../services/repository.service";

export const addReward = async (body) => {
  const { userId, recordId, share, reward, balance } = body;

  const existingUser = await getUserFromId(userId);
  if (!existingUser) throw new Error("Invalid user id");

  const rewardRecord = new rewardModel({
    userId,
    swapRecord: recordId,
    share,
    reward,
    balance,
  });

  await repository.save(rewardRecord);
};
