import joi from "joi";

export const withdraw = joi.object().keys({
  userId: joi.string().alphanum().min(24).max(24).required(),
  amount: joi.string().min(1).required(),
  address: joi.string().required(),
});
