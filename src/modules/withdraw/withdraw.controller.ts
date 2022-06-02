import * as withdrawService from "./withdraw.service";
import * as response from "../../services/response.service";

export const withdraw = async (req, res) => {
  try {
    const withdrawal = await withdrawService.withdraw(req.body);
    return response.successWithData(withdrawal, res);
  } catch (error) {
    return response.customError(`${error}`, res);
  }
};

export const updateWithdrawal = async (body) => {
  try {
    await withdrawService.updateWithdrawal(body);
  } catch (error) {
    console.log(error);
  }
};
