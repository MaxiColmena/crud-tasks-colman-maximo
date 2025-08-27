import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { Task } from "./task.models.js";
import { Categories } from "./categories.models.js";

export const Task_Categories = sequelize.define("Task_Categories", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  task_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  categories_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: false,
});

//relación para la tabla de muchos a muchos

Task.belongsToMany(Categories, {
  through: Task_Categories,
  foreignKey: "task_id",
  as: "categories",
});

Categories.belongsToMany(Task, {
  through: Task_Categories,
  foreignKey: "categories_id",
  as: "tasks",
});

Task_Categories.belongsTo(Categories, {
  foreignKey: "categories_id",
});

Task_Categories.belongsTo(Task, {
  foreignKey: "task_id",
});