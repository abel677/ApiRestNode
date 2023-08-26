import { DataTypes } from "sequelize";
import { sequelize } from "../utils/db.js";
import { Page } from "./page.js";
import { Rol } from "./rol.model.js";

export const PageRol = sequelize.define(
  "pagesRoles",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    pageId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rolId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

Page.belongsToMany(Rol, { through: "pagesRoles", foreignKey: "pageId" });
Rol.belongsToMany(Page, { through: "pagesRoles", foreignKey: "rolId" });
