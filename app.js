import express from "express";
import dotenv from "dotenv";
import { routerTask } from "./src/routes/task.routes.js";
import { routerUser } from "./src/routes/user.routes.js";
import { startDB } from "./src/config/db.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use("/api", routerTask);
app.use("/api", routerUser);

startDB().then(()=>{app.listen(PORT, ()=>{
    console.log("Escuchando en el puerto:", PORT);
})});