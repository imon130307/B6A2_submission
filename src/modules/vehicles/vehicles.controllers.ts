import { Request, Response } from "express";
import { vehiclesServices } from "./vehicles.service";


//!----Vehicle CRUD operation------
//!-----Post a Vehicle------
const createVehicle = async (req: Request, res: Response) => {
  const { vehicle_name,type,registration_number,daily_rent_price,availability_status } = req.body;

  try {
  
    const result = await vehiclesServices.createVehicle(vehicle_name, type, registration_number, daily_rent_price, availability_status);
    res.status(201).json({
      success: true,
      message: "vehicle is created",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//!-----get all Vehicle------
const getVehicles = async (req: Request, res: Response) => {
  try {
    const result = await vehiclesServices.getVehicles();

    res.status(200).json({
      success: true,
      message: "Vehicles retrieved successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      details: error,
    });
  }
};

//!-----get a Vehicle------
const getSingleVehicle = async (req: Request, res: Response) => {
  try {
    // console.log(req.params.id)
    const user_id = req.params.id;
   
    const result = await vehiclesServices.getSingleVehicle(user_id as string);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch Vehicle" });
  }
};

//!-----update a Vehicle------
const updateVehicle = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { vehicle_name, type,registration_number,daily_rent_price,availability_status } = req.body;
   
    const result = await vehiclesServices.updateVehicle(vehicle_name, type,registration_number,daily_rent_price,availability_status, id!);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Vehicle not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to update Vehicles" });
  }
};

//!-----delete a vehicle------
const deleteVehicle = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const result = await vehiclesServices.deleteVehicle(id!);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Vehicle not found" });
    }

    res.json({ success: true, message: "Vehicle deleted", data: null });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to delete Vehicle" });
  }
};

export const vehicleControllers = {
  createVehicle,
  getVehicles,
  getSingleVehicle,
  updateVehicle,
  deleteVehicle,
};
