import Contacts from "../db/models/contacts.js";
import HttpError from "../helpers/HttpError.js";

async function listContacts(
  query = {},
  { page = 1, limit = 10 },
  favorite = False
) {
  if (favorite) {
    query.favorite = "true";
  }

  const normalizedLimit = Number(limit);
  const offset = (Number(page) - 1) * normalizedLimit;

  return Contacts.findAll({
    where: query,
    offset,
    limit: normalizedLimit,
  });
}

async function getContact(query) {
  return Contacts.findOne({
    where: query,
  });
}

async function removeContact(query) {
  return Contacts.destroy({
    where: query,
  });
}

async function addContact(data) {
  return Contacts.create(data);
}

async function updateContactById(query, data) {
  const user = await getContact(query);
  if (!user) {
    return null;
  }
  return user.update(data, {
    returning: true,
  });
}

async function updateStatusContact(query, { favorite }) {
  const user = await getContact(query);

  if (!user) {
    throw HttpError(404);
  }
  return user.update(
    { favorite },
    {
      returning: true,
    }
  );
}

export default {
  listContacts,
  getContact,
  removeContact,
  addContact,
  updateContactById,
  updateStatusContact,
};
