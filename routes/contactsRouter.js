import express from "express";
import contactsControllers from "../controllers/contactsControllers.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactsControllers.listContacts);

contactsRouter.get("/:id", contactsControllers.getContactById);

contactsRouter.delete("/:id", contactsControllers.removeContact);

contactsRouter.post("/", contactsControllers.addContact);

contactsRouter.put("/:id", contactsControllers.updateContact);

contactsRouter.put("/:id/favorite", contactsControllers.updateStatusContact);

export default contactsRouter;
