import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

export const Task = sequelize.define("tasks",{
    id:{
        type: DataTypes.INTEGER(100),
        autoIncrement: true,
        primeryKey: true,
    },
    title: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    isColmplete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
});