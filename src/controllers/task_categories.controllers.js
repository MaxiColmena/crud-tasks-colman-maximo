import { Task_Categories } from "../models/task_categories.models.js";
import { Task } from "../models/task.models.js";
import { Categories } from "../models/categories.models.js";

//Esta funcionalidad crea los Task_Categories en nuestra base de datos
export const createTask_Categories = async(req, res) => {

    //Esta funcionalidad elimina los espacios al principio y al final de las cadenas de texto(string)
    if(req.body){
        for (let value in req.body){
            if (typeof req.body[value] === "string"){
                req.body[value] = req.body[value].trim();
            }
        }
    }

    const {categorie_id, task_id} = req.body;

    try {
        const task = await Task.findByPk(task_id)
        if(!task) return res.status(404).json({Message: "no existe"});

        const categorie = await Categories.findByPk(categorie_id)
        if(!categorie) return res.status(404).json({Message: "no existe"});

        const task_Categories = await Task_Categories.create({task_id, categorie_id});
        res.status(200).json({Message: "El Task_Categories a sido creado con éxito: ", task_Categories});
    } catch (error) {
        console.log("Error en la creación del Task_Categories: ", error)
        res.status(500).json({Message: error.message});
    }
}

//Esta funcionalidad trae a todos los Task_Categories

export const getAllTask_Categories = async(req, res) => {
    try {
        const task_Categories = await Task_Categories.findAll();
        if(task_Categories.length === 0) return res.json({Message: "No existen Task_Categories en la base de datos"});
        res.json(task_Categories)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

//Esta funcionalidad trae los Task_Categories por Id estrictamente

export const getTask_CategoriesById = async(req, res) => {
    try {
        const task_Categories = await Task_Categories.findByPk(req.params.id);
        if(task_Categories) return res.status(200).json(task_Categories);

        return res.status(404).json({Message: "El task_Categories no existe en la base de datos."});

    } catch (error) {
        res.status(500).json({Message: error.message});
    }
}

//Esta funcionalidad actualiza la información de los Task_Categories por Id

export const updateTask_Categories = async(req, res) =>{
    
   const {id} = req.body;
    
    //quita los espacios al principio y al final
    if(req.body){
        for (let value in req.body){
            if (typeof req.body[value] === "string"){
                req.body[value] = req.body[value].trim();
            }
        }
    }
    
    try {

        const [updated] = await Task_Categories.update({id}, {where: {id: req.params.id}});
    //si las filas afectadas son mayores a 0, el Task_Categories se va a actualiar con éxito
    if (updated === 0) res.status(400).json({Message: "El Task_Categories no existe o no fue encontrada"})

    return res.status(200).json({Message: "El Task_Categories fue actualizado con éxito"});

    } catch (error) {
        res.status(500).json({Message: error.message});
    }
}

//Esta funcionalidad elimina a los Task_Categories por Id estrictamente

export const deleteTask_Categories = async(req, res) =>{
    try {
        const deleted = await Task_Categories.destroy({where: {id: req.params.id}});
        //es para hacer un delete al Task_Categories que coincida con el id que deseamos eliminar
        if(deleted) res.json({message: "Task_Categories fue borrado de la base de datos"});
        res.status(404).json({message: "Task_Categories no fue encontrado"})
    } catch (error) {
    res.status(500).json({Message: error.message});  
    }
}