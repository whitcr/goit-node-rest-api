import { ValidationError } from "sequelize";
import HttpError from "../helpers/HttpError.js";

const ctrlWrapper = (fn) => {
  const func = async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      if (error?.parent?.code === "23505") {
        return next(HttpError(409, "Email in use"));
      }

      if (error instanceof ValidationError) {
        return next(
          HttpError(400, "Помилка від Joi або іншої бібліотеки валідації")
        );
      }
      next(error);
    }
  };

  return func;
};

export default ctrlWrapper;
