import { DataTypes } from "sequelize";

import sequelize from "../sequelize.js";

const Users = sequelize.define("users", {
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  verify: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  verificationCode: {
    type: DataTypes.STRING,
  },
  subscription: {
    type: DataTypes.ENUM,
    values: ["starter", "pro", "business"],
    defaultValue: "starter",
  },
  avatarURL: DataTypes.STRING,
  token: {
    type: DataTypes.STRING,
    defaultValue: null,
  },
});

// Users.sync({ force: true });

export default Users;
