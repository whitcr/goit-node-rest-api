import Joi from "joi";
import { emailRegexp } from "../constants/auth.js";

export const authSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(4).required(),
});

export const updateSubSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});
