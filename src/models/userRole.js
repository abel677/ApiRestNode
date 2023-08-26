import { DataTypes } from "sequelize";
import { sequelize } from "../utils/db.js";
import { User } from "./user.model.js";
import { Rol } from "./roles.model.js";

export const UserRole = sequelize.define(
  "usersRoles",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    rolId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps: false,
  }
);
User.belongsToMany(Rol, { through: "usersRoles", foreignKey: "userId" });
Rol.belongsToMany(User, { through: "usersRoles", foreignKey: "rolId" });
