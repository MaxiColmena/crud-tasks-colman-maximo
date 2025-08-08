import express from "express";
import {createTask, getAllTask, getTaskById, updateTask, deleteTask} from "../controllers/task.controllers.js";
 export const routerTask = express.Router();

routerTask.post("/task", createTask);
routerTask.get("/task", getAllTask);
routerTask.get("/task/:id", getTaskById);
routerTask.put("/task/:id", updateTask);
routerTask.delete("/task/:id", deleteTask);