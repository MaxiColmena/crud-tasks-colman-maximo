import { where } from "sequelize";
import { Task } from "../models/task.models.js";

//Esta funcionalidad crea las tareas en nuestra base de datos
export const createTask = async(req, res) => {

    //Esta funcionalidad elimina los espacios al principio y al final de las cadenas de texto(string)
    if(req.body){
        for (let value in req.body){
            if (typeof req.body[value] === "string"){
                req.body[value] = req.body[value].trim();
            }
        }
    }

    const {title, description, isComplete } = req.body;

    try {
        //Validacion para que los datos no se reciban vacios.
        if(title === undefined || title === "") return res.status(400).json({errorMessage: "Debe completar el campo 'title', no puede estar vacio."})
        if(description === undefined || description === "") return res.status(400).json({errorMessage: "Debe completar el campo 'description', no puede estar vacio."})
        if(typeof isComplete !== "boolean") return res.status(400).json({Message: "IsComplete debe ser booleano"});

        const task = await Task.create({title, description, isComplete});
        res.status(200).json({Message: "Tarea creada con éxito: ", task});
    } catch (error) {
        console.log("Error en la creación de la tarea: ", error)
        res.status(500).json({Message: error.message});
    }
}

//Esta funcionalidad trae a todas las tareas

export const getAllTask = async(req, res) => {
    try {
        const task = await Task.findAll();
        if(task.length === 0) return res.json({Message: "No existen tareas en la base de datos"});
        res.json(task)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

//Esta funcionalidad trae las tareas por Id estrictamente

export const getTaskById = async(req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if(task) return res.status(200).json(task);

        return res.status(404).json({Message: "La tarea no existe en la base de datos."});

    } catch (error) {
        res.status(500).json({Message: error.message});
    }
}

//Esta funcionalidad actualiza la información de las tareas por Id

export const updateTask = async(req, res) =>{
    
   const {title, description, isComplete } = req.body;
    
    //quita los espacios al principio y al final
    if(req.body){
        for (let value in req.body){
            if (typeof req.body[value] === "string"){
                req.body[value] = req.body[value].trim();
            }
        }
    }
    
    try {
        //validación para que el nombre sea unico
        if (title){
        const titleUnique = await Task.findOne({where: {title}})
        if(titleUnique) return res.status(400).json({errorMessage: "El nombre debe ser único por tarea."});
        }

        const [updated] = await Task.update({title, description, isCompleted}, {where: {id: req.params.id}});
    //si las filas afectadas son mayores a 0, la tarea se va a actualiar con éxito
    if (updated === 0) res.status(400).json({Message: "La tarea no existe o no fue encontrada"})

    return res.status(200).json({Message: "La tarea fue actualizada con éxito"});

    } catch (error) {
        res.status(500).json({Message: error.message});
    }
}

//Esta funcionalidad elimina a las tareas por Id estrictamente

export const deleteTask = async(req, res) =>{
    try {
        const deleted = await Task.destroy({where: {id: req.params.id}});
        //es para hacer un delete a la tarea que coincida con el id que deseamos eliminar
        if(deleted) res.json({message: "La tarea fue borrada de la base de datos"});
        res.status(404).json({message: "La tarea no fue encontrada"})
    } catch (error) {
    res.status(500).json({Message: error.message});  
    }
}