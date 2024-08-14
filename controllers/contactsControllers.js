import contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";
import {
  contactSchema,
  updateContactSchema,
  updateFavSchema,
} from "../schemas/contactsSchemas.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

const listContacts = async (req, res, next) => {
  const { id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const result = await contactsService.listContacts({ owner }, { page, limit });

  res.status(200).json(result);
};

const getContactById = async (req, res, next) => {
  const { id } = req.params;
  const { id: owner } = req.user;

  const result = await contactsService.getContactById({ id, owner });
  if (!result) {
    throw HttpError(404, `Movie with id=${id} not found`);
  }

  res.json(result);
};

const removeContact = async (req, res, next) => {
  const { id } = req.params;
  const { id: owner } = req.user;
  const result = await contactsService.removeContact({ id, owner });
  if (!result) {
    throw HttpError(404, `Movie with id=${id} not found`);
  }

  res.json({
    message: "Movie delete successfuly",
  });
};
const addContact = async (req, res, next) => {
  const { error } = contactSchema.validate(req.body);
  const { id: owner } = req.user;

  if (error) {
    throw HttpError(400, error.message);
  }
  const result = await contactsService.addContact({ ...req.body, owner });

  res.status(201).json(result);
};

const updateContact = async (req, res, next) => {
  const { error } = updateContactSchema.validate(req.body);

  if (error) {
    throw HttpError(400, error.message);
  }

  const { id } = req.params;
  const { id: owner } = req.user;

  const result = await contactsService.updateContactById(
    { id, owner },
    req.body
  );
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
  const { id: owner } = req.user;

  const updatedContact = await contactsService.updateStatusContact(
    { id, owner },
    {
      favorite,
    }
  );

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
