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
    description: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    isComplete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
});