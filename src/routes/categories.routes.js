import express from "express";
import {createCategories, getAllCategories, getCategoriesById, updateCategories, deleteCategories} from "../controllers/categories.controllers.js";
 export const routerCategories = express.Router();

routerCategories.post("/categories", createCategories);
routerCategories.get("/categories", getAllCategories);
routerCategories.get("/categories/:id", getCategoriesById);
routerCategories.put("/categories/:id", updateCategories);
routerCategories.delete("/categories/:id", deleteCategories);