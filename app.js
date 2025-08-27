import express from "express";
import dotenv from "dotenv";
import { routerTask } from "./src/routes/task.routes.js";
import { routerUser } from "./src/routes/user.routes.js";
import { startDB } from "./src/config/db.js";
import { routerAddress } from "./src/routes/address.routes.js";
import { routerCategories } from "./src/routes/categories.routes.js";
import { routerTask_Categories } from "./src/routes/task_categories.routes.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use("/api", routerTask);
app.use("/api", routerUser);
app.use("/api", routerAddress);
app.use("/api", routerCategories);
app.use("/api", routerTask_Categories);

startDB().then(()=>{app.listen(PORT, ()=>{
    console.log("Escuchando en el puerto:", PORT);
})});