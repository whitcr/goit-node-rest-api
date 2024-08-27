import express from "express";

import authControllers from "../controllers/authControllers.js";

import authenticate from "../middlewares/authenticate.js";

import validateBody from "../helpers/validateBody.js";

import {
  authSchema,
  updateSubSchema,
  authEmailSchema,
} from "../schemas/authSchemas.js";
import upload from "../middlewares/upload.js";

const authRouter = express.Router();

const verifyEmailMiddleware = validateBody(authEmailSchema);

const signupMiddleware = validateBody(authSchema);

authRouter.post("/register", signupMiddleware, authControllers.register);

authRouter.get("/verify/:verificationCode", authControllers.verify);

authRouter.post("/verify", verifyEmailMiddleware, authControllers.resendVerify);

authRouter.post("/login", signupMiddleware, authControllers.login);

authRouter.post("/logout", authenticate, authControllers.logout);

authRouter.get("/current", authenticate, authControllers.getCurrent);

authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatarURL"),
  authControllers.updateAvatar
);

authRouter.get(
  "/subscription",
  validateBody(updateSubSchema),
  authenticate,
  authControllers.subscription
);

export default authRouter;
