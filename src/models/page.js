import { DataTypes } from "sequelize";
import { sequelize } from "../utils/db.js";

export const Page = sequelize.define('pages', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    menu: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    page: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    link: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
})