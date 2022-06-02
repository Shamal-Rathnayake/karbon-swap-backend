import joi from "joi";
import config from "../../config/config";

export const createUser = joi.object().keys({
  username: joi.string().required(),
  firstName: joi.string().required(),
  lastName: joi.string(),
  email: joi
    .string()
    .email({ tlds: { allow: false }, ignoreLength: true })
    .required(),
  password: joi.string().min(8).max(32).required(),
});

export const createUserByReferralCode = joi.object().keys({
  username: joi.string().required(),
  firstName: joi.string().required(),
  lastName: joi.string(),
  email: joi
    .string()
    .email({ tlds: { allow: false }, ignoreLength: true })
    .required(),
  password: joi.string().min(8).max(32).required(),
  referralCode: joi.string().required(),
});

export const updateUser = joi.object().keys({
  id: joi.string().alphanum().min(24).max(24).required(),
  role: joi
    .string()
    .required()
    .valid(...Object.values(config.userRoles)),
  username: joi.string(),
  firstName: joi.string(),
  lastName: joi.string(),
  email: joi.string().email({ tlds: { allow: false }, ignoreLength: true }),
});

export const login = joi.object().keys({
  email: joi
    .string()
    .email({ tlds: { allow: false }, ignoreLength: true })
    .required(),
  password: joi.string().min(8).max(32).required(),
  role: joi
    .string()
    .required()
    .valid(...Object.values(config.userRoles))
    .required(),
});

export const id = joi.object().keys({
  id: joi.string().alphanum().min(24).max(24).required(),
});
