
import { Task } from "../models/task.models.js";

// Obtener todas las tareas
export const getAllTask = async (req, res) => {
  try {
    const tasks = await Task.findAll(); // trae todas las tareas
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener las tareas" });
  }
};

// Obtener tarea por id
export const getTaskById = async (req, res) => {
  try {
    const tasks = await Task.findByPk();
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener la tarea" });
  }
};

// Crear una nueva tarea
export const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTask = await Task.create({ title, description });
    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear la tarea" });
  }
};

// Actualizar una tarea por id
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const task = await Task.findByPk(id);

    if (!task) return res.status(404).json({ message: "Tarea no encontrada" });

    await task.update({ title, description });
    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar la tarea" });
  }
};

// Eliminar una tarea por id
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);

    if (!task) return res.status(404).json({ message: "Tarea no encontrada" });

    await task.destroy();
    res.json({ message: "Tarea eliminada" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar la tarea" });
  }
};
