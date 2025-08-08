import { sequelize } from "./database.js";

export const startDB = async() => {
    try {
        await sequelize.authenticate();
        console.log("conectado a la base de datos")
        await sequelize.sync();
    } catch (error) {
        console.loh("Error al conectar a la base de datos", error);
    }
};