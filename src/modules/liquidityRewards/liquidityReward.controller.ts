import * as rewardService from "./liquidityReward.service";
import * as response from "../../services/response.service";

export const addReward = async (body) => {
  try {
    await rewardService.addReward(body);
  } catch (error) {
    console.log(error);
  }
};
