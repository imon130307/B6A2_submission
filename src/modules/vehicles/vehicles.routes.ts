import { vehicleControllers } from "./vehicles.controllers";
import express from "express";

// const router = Router()
//*-------Or---------
const router = express.Router();

//!-----Vehicle CRUD operation------
//!-----Post a Vehicle------
router.post("/", vehicleControllers.createVehicle);

//!-----get all Vehicle------
router.get("/", vehicleControllers.getVehicles);

//!-----get a Vehicle------
router.get("/:id", vehicleControllers.getSingleVehicle);

//!-----update a Vehicle------
router.put("/:id", vehicleControllers.updateVehicle);

//!-----delete a Vehicle------
router.delete("/:id", vehicleControllers.deleteVehicle);

//*--------------------------------
export const vehicleRouter = router;
