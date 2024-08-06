import contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";
import {
  contactSchema,
  updateContactSchema,
  updateFavSchema,
} from "../schemas/contactsSchemas.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

const listContacts = async (req, res, next) => {
  const result = await contactsService.listContacts();

  res.status(200).json(result);
};

const getContactById = async (req, res, next) => {
  const { id } = req.params;

  const result = await contactsService.getContactById(id);
  if (!result) {
    throw HttpError(404, `Movie with id=${id} not found`);
  }

  res.json(result);
};

const removeContact = async (req, res, next) => {
  const { id } = req.params;
  const result = await contactsService.removeContact(id);
  if (!result) {
    throw HttpError(404, `Movie with id=${id} not found`);
  }

  res.json({
    message: "Movie delete successfuly",
  });
};
const addContact = async (req, res, next) => {
  const { error } = contactSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const result = await contactsService.addContact(req.body);

  res.status(201).json(result);
};

const updateContact = async (req, res, next) => {
  const { error } = updateContactSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }

  const { id } = req.params;

  const result = await contactsService.updateContactById(id, req.body);
  if (!result) {
    throw HttpError(404, `Movie with id=${id} not found`);
  }

  res.json(result);
};

const updateStatusContact = async (req, res, next) => {
  const { error } = updateFavSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }

  const { id } = req.params;
  const { favorite } = req.body;

  const updatedContact = await contactsService.updateStatusContact(id, {
    favorite,
  });

  if (updatedContact) {
    return res.status(200).json(updatedContact);
  } else {
    throw HttpError(400, error.message);
  }
};

export default {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  removeContact: ctrlWrapper(removeContact),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
