import * as userService from "./user.service";
import * as response from "../../services/response.service";

export const createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    return response.successWithData(user, res);
  } catch (error) {
    return response.customError(`${error}`, res);
  }
};

export const createUserByReferralCode = async (req, res) => {
  try {
    const user = await userService.createUserByReferralCode(req.body);
    return response.successWithData(user, res);
  } catch (error) {
    return response.customError(`${error}`, res);
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await userService.updateUser(req.body);
    return response.successWithData(user, res);
  } catch (error) {
    return response.customError(`${error}`, res);
  }
};

export const login = async (req, res) => {
  try {
    const user = await userService.login(req.body);
    return response.successWithDataAndToken(user, res);
  } catch (error) {
    return response.customError(`${error}`, res);
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    return response.successWithData(user, res);
  } catch (error) {
    return response.customError(`${error}`, res);
  }
};

export const getAllReferees = async (req, res) => {
  try {
    const user = await userService.getAllReferees(req.params.id);
    return response.successWithData(user, res);
  } catch (error) {
    return response.customError(`${error}`, res);
  }
};
