import { Categories } from "../models/categories.models.js";

//Esta funcionalidad crea las categorias en nuestra base de datos
export const createCategories = async(req, res) => {

    //Esta funcionalidad elimina los espacios al principio y al final de las cadenas de texto(string)
    if(req.body){
        for (let value in req.body){
            if (typeof req.body[value] === "string"){
                req.body[value] = req.body[value].trim();
            }
        }
    }

    const { is_urgent, is_group} = req.body;

    try {
        //Validacion para que los datos no se reciban vacios.
        if(is_urgent === undefined || is_urgent === "") return res.status(400).json({errorMessage: "Debe completar el campo 'is_urgent', no puede estar vacio."})
        if(is_group === undefined || is_group === "") return res.status(400).json({errorMessage: "Debe completar el campo 'is_group', no puede estar vacio."})

        const categories = await Categories.create({categories_id, is_urgent, is_group});
        res.status(200).json({Message: "La categoria a sido creado con éxito: ", user});
    } catch (error) {
        console.log("Error en la creación de la categoria: ", error)
        res.status(500).json({Message: error.message});
    }
}

//Esta funcionalidad trae a todas las categorias

export const getAllCategories = async(req, res) => {
    try {
        const categories = await Categories.findAll();
        if(categories.length === 0) return res.json({Message: "No existen categorias en la base de datos"});
        res.json(user)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

//Esta funcionalidad trae las categoria por Id estrictamente

export const getCategoriesById = async(req, res) => {
    try {
        const categories = await Categories.findByPk(req.params.id);
        if(categories) return res.status(200).json(categories);

        return res.status(404).json({Message: "La categoria no existe en la base de datos."});

    } catch (error) {
        res.status(500).json({Message: error.message});
    }
}

//Esta funcionalidad actualiza la información de las categoria por Id

export const updateCategories = async(req, res) =>{
    
   const {is_urgent, is_group} = req.body;
    
    //quita los espacios al principio y al final
    if(req.body){
        for (let value in req.body){
            if (typeof req.body[value] === "string"){
                req.body[value] = req.body[value].trim();
            }
        }
    }
    
    try {
        const [updated] = await User.update({ is_urgent, is_group}, {where: {id: req.params.id}});
    //si las filas afectadas son mayores a 0, la categoria se va a actualiar con éxito
    if (updated === 0) res.status(400).json({Message: "La categoria no existe o no fue encontrada"})

    return res.status(200).json({Message: "La categoria fue actualizado con éxito"});

    } catch (error) {
        res.status(500).json({Message: error.message});
    }
}

//Esta funcionalidad elimina a los usuarios por Id estrictamente

export const deleteCategories = async(req, res) =>{
    try {
        const deleted = await Categories.destroy({where: {id: req.params.id}});
        //es para hacer un delete a la categoria que coincida con el id que deseamos eliminar
        if(deleted) res.json({message: "La categoria fue borrado de la base de datos"});
        res.status(404).json({message: "La categoria no fue encontrado"})
    } catch (error) {
    res.status(500).json({Message: error.message});  
    }
}