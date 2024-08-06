import Joi from "joi";

const contactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(7).max(15).required(),
  favorite: Joi.boolean(),
});

const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().email(),
  phone: Joi.string().min(7).max(15),
  favorite: Joi.boolean(),
}).or("name", "email", "phone", "favourite");

const updateFavSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

export { contactSchema, updateContactSchema, updateFavSchema };
