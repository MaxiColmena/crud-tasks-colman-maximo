import express from "express";
import {createAddress, getAllAddress, getAddressById, updateAddress, deleteAddress} from "../controllers/address.controllers.js";
 export const routerAddress = express.Router();

routerAddress.post("/address", createAddress);
routerAddress.get("/address", getAllAddress);
routerAddress.get("/address/:id", getAddressById);
routerAddress.put("/address/:id", updateAddress);
routerAddress.delete("/address/:id", deleteAddress);