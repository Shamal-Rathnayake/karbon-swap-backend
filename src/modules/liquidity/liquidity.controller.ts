import * as liquidityService from "./liquidity.service";
import * as response from "../../services/response.service";

export const addLiquidity = async (body) => {
  try {
    await liquidityService.addLiquidity(body);
  } catch (error) {
    console.log(error);
  }
};
