import express from "express";
import contactsControllers from "../controllers/contactsControllers.js";
import authenticate from "../middlewares/authenticate.js";

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get("/", contactsControllers.listContacts);

contactsRouter.get("/:id", contactsControllers.getContactById);

contactsRouter.delete("/:id", contactsControllers.removeContact);

contactsRouter.post("/", contactsControllers.addContact);

contactsRouter.put("/:id", contactsControllers.updateContact);

contactsRouter.patch("/:id/favorite", contactsControllers.updateStatusContact);

export default contactsRouter;
