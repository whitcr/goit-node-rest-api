import Users from "../db/models/users.js";
import bcrypt from "bcrypt";
import gravatar from "gravatar";
import sendEmail from "../helpers/sendEmail.js";
import { nanoid } from "nanoid";

const { BASE_URL } = process.env;

export const register = async (data) => {
  try {
    const avatar = gravatar.url(data.email);
    const { password } = data;
    const verificationCode = nanoid();
    const hashPass = await bcrypt.hash(password, 10);
    const newUser = await Users.create({
      ...data,
      password: hashPass,
      verificationCode,
      avatarURL: avatar,
    });

    await sendVerifyEmail(data.email, verificationCode);

    return newUser;
  } catch (error) {
    throw error;
  }
};

export const findUser = (query) =>
  Users.findOne({
    where: query,
  });

export const updateUser = async (query, data) => {
  const user = await findUser(query);
  if (!user) {
    return null;
  }

  return user.update(data, {
    returning: true,
  });
};

export const sendVerifyEmail = (email, verificationCode) => {
  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationCode}">Click to verify email</a>`,
  };

  return sendEmail(verifyEmail);
};
