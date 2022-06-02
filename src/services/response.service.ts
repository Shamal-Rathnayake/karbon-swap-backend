import { Response } from "express";
import { generateJwt } from "./token.service";

export const successWithData = (data: any, res: Response): Response => {
  return res.json({
    status: true,
    data,
  });
};

export const successWithMessage = (message: string, res: Response): Response => {
  return res.json({
    status: true,
    msg: message,
  });
};

export const customError = (message: any, res: Response): Response => {
  return res.status(422).json({
    status: false,
    message: message,
  });
};

export const internalErrorHandle = (message: string, res: Response): Response => {
  return res.status(422).json({
    status: false,
    message,
  });
};

export const successWithDataAndToken = (data: any, res: Response): Response => {
  return res.json({
    status: true,
    data,
    token: generateJwt(data._id, data.email, data.role),
  });
};
