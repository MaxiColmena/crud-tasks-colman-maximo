import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Categories = sequelize.define("categories",{
    id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    },
    is_urgent: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    is_group: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        
    }
},{
    timestamps: false
});