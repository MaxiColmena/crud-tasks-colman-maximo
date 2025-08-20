import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Address = sequelize.define("addresses", {
    address_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    street: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    street_number: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    neighborhood: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
}, {
    timestamps: false
});