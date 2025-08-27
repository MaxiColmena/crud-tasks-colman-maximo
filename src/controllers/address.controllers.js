import { Address } from "../models/address.models.js";

//Esta funcionalidad crea la direccion en nuestra base de datos
export const createAddress = async(req, res) => {

    //Esta funcionalidad elimina los espacios al principio y al final de las cadenas de texto(string)
    if(req.body){
        for (let value in req.body){
            if (typeof req.body[value] === "string"){
                req.body[value] = req.body[value].trim();
            }
        }
    }

    const { street_name, street_number, neighborhood } = req.body;

    try {
        //Validacion para que los datos no se reciban vacios.
        if(street_name === undefined || street_name === "") return res.status(400).json({errorMessage: "Debe completar el campo 'street_name', no puede estar vacio."})
        if(street_number === undefined || street_number === "") return res.status(400).json({errorMessage: "Debe completar el campo 'street_number', no puede estar vacio."})
        if(neighborhood === undefined || neighborhood === "") return res.status(400).json({errorMessage: "Debe completar el campo 'neighborhood', no puede estar vacio."})

        const address = await Address.create({address_id, street_name, street_number, neighborhood });
        res.status(200).json({Message: "La dirección a sido creada con éxito: ", address});
    } catch (error) {
        console.log("Error en la creación de la direcciób: ", error)
        res.status(500).json({Message: error.message});
    }
}

//Esta funcionalidad trae todas las direcciones

export const getAllAddress = async(req, res) => {
    try {
        const address = await Address.findAll();
        if(user.length === 0) return res.json({Message: "No existen direcciones en la base de datos"});
        res.json(address)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

//Esta funcionalidad trae todas las direcciones por Id estrictamente

export const getAddressById = async(req, res) => {
    try {
        const address = await Address.findByPk(req.params.id);
        if(address) return res.status(200).json(address);

        return res.status(404).json({Message: "La dirección no existe en la base de datos."});

    } catch (error) {
        res.status(500).json({Message: error.message});
    }
}

//Esta funcionalidad actualiza la información de los usuarios por Id

export const updateAddress = async(req, res) =>{
    
   const {street_name, street_number, neighborhood} = req.body;
    
    //quita los espacios al principio y al final
    if(req.body){
        for (let value in req.body){
            if (typeof req.body[value] === "string"){
                req.body[value] = req.body[value].trim();
            }
        }
    }
    
    try {
        const [updated] = await Address.update({street_name, street_number, neighborhood }, {where: {id: req.params.id}});
    //si las filas afectadas son mayores a 0, la direccion se va a actualiar con éxito
    if (updated === 0) res.status(400).json({Message: "La direccion no existe o no fue encontrada"})

    return res.status(200).json({Message: "La direccion fue actualizado con éxito"});

    } catch (error) {
        res.status(500).json({Message: error.message});
    }
}

//Esta funcionalidad elimina a los dirección por Id estrictamente

export const deleteAddress = async(req, res) =>{
    try {
        const deleted = await Address.destroy({where: {id: req.params.id}});
        //es para hacer un delete a la direccion que coincida con el id que deseamos eliminar
        if(deleted) res.json({message: "La direccion fue borrada de la base de datos"});
        res.status(400).json({message: "La direccion no fue encontrada"})
    } catch (error) {
    res.status(500).json({Message: error.message});  
    }
}