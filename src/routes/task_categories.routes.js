import express from "express";
import {createTask_Categories, getAllTask_Categories, getTask_CategoriesById, updateTask_Categories, deleteTask_Categories} from "../controllers/task_categories.controllers.js";
 export const routerTask_Categories = express.Router();

routerTask_Categories.post("/categories", createTask_Categories);
routerTask_Categories.get("/categories", getAllTask_Categories);
routerTask_Categories.get("/categories/:id", getTask_CategoriesById);
routerTask_Categories.put("/categories/:id", updateTask_Categories);
routerTask_Categories.delete("/categories/:id", deleteTask_Categories);