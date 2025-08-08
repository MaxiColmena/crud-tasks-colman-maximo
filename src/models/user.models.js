import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

export const User = sequelize.define("users",{
    id:{
        type: DataTypes.INTEGER(100),
        autoIncrement: true,
        primeryKey: true,
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false,
    }
});