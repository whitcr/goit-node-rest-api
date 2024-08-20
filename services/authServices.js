import Users from "../db/models/users.js";
import bcrypt from "bcrypt";
import gravatar from "gravatar";

export const register = async (data) => {
  try {
    const avatar = gravatar.url(data.email);
    const { password } = data;
    const hashPass = await bcrypt.hash(password, 10);
    const newUser = await Users.create({
      ...data,
      password: hashPass,
      avatarURL: avatar,
    });
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
