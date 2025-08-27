import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { User } from "./user.models.js";

export const Address = sequelize.define("address",{
    address_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    street_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    street_number: {
        type: DataTypes.INTEGER,
        allowNull: false, 
    },
    neighborhood: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
},{
    timestamps: false
});


//Uno a uno

Address.belongsTo(User, { 
    foreignKey: "user_id", 
    as: "user" 
});
User.hasOne(Address, { 
    foreignKey: "user_id", 
    as: "Address" 
});

