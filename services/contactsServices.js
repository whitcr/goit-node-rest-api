import User from "../db/models/user.js";

async function listContacts() {
  return User.findAll();
}

async function getContactById(contactId) {
  return User.findByPk(contactId);
}

async function removeContact(contactId) {
  return User.destroy({
    where: {
      id: contactId,
    },
  });
}

async function addContact(data) {
  return User.create(data);
}

async function updateContactById(id, data) {
  const user = await getContactById(id);
  if (!user) {
    return null;
  }
  return user.update(data, {
    returning: true,
  });
}

async function updateStatusContact(contactId, { favorite }) {
  const user = await getContactById(contactId);

  if (!user) {
    return null;
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
  getContactById,
  removeContact,
  addContact,
  updateContactById,
  updateStatusContact,
};
