import { ValidationError } from "sequelize";

const ctrlWrapper = (fn) => {
  const func = async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      if (error instanceof ValidationError) {
        return next(HttpError(400, error.message));
      }
      next(error);
    }
  };

  return func;
};

export default ctrlWrapper;
