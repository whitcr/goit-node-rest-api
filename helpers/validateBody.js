import HttpError from "./HttpError.js";

const validateBody = (schema) => {
  const func = (req, _, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      const errorMessage = error.details
        .map((detail) => detail.message)
        .join(", ");
      return next(
        HttpError(
          400,
          `Помилка валідації: ${errorMessage}. Перевірте правильність даних.`
        )
      );
    }

    next();
  };

  return func;
};

export default validateBody;
