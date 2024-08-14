import express from "express";

import authControllers from "../controllers/authControllers.js";

import authenticate from "../middlewares/authenticate.js";

import validateBody from "../helpers/validateBody.js";

import { authSchema, updateSubSchema } from "../schemas/authSchemas.js";

const authRouter = express.Router();

const signupMiddleware = validateBody(authSchema);

authRouter.post("/register", signupMiddleware, authControllers.register);

authRouter.post("/login", signupMiddleware, authControllers.login);

authRouter.post("/logout", authenticate, authControllers.logout);

authRouter.get("/current", authenticate, authControllers.getCurrent);

authRouter.get(
  "/subscription",
  validateBody(updateSubSchema),
  authenticate,
  authControllers.subscription
);

export default authRouter;
