import { Request, Response } from "express";
import { bookingsServices } from "./bookings.service";


//!----Bookings CRUD operation------
//!-----Post a Bookings------
const createBooking= async (req: Request, res: Response) => {
  console.log("Request body===>>>",req.body)
  const { customer_id,vehicle_id,rent_start_date,rent_end_date,status} = req.body;

  try {
    const result = await bookingsServices.createBooking(customer_id,vehicle_id,rent_start_date,rent_end_date,status);
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

//!-----get all Bookings------
const getBookings = async (req: Request, res: Response) => {
  try {
    const result = await bookingsServices.getBookings();

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

//!-----get a Bookings------
const getSingleBooking = async (req: Request, res: Response) => {
  try {
    // console.log(req.params.id)
    const user_id = req.params.id;
   
    const result = await bookingsServices.getSingleBooking(user_id as string);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch Booking" });
  }
};

//!-----update a Bookings------
const updateBooking = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { status } = req.body;
    const result = await bookingsServices.updateBooking(status, id!);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to update Booking" });
  }
};

//!-----delete a Bookings------
const deleteBooking = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const result = await bookingsServices.deleteBookings(id!);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.json({ success: true, message: "Booking deleted", data: null });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to delete Booking" });
  }
};

export const bookingsControllers = {
  createBooking,
  getBookings,
  getSingleBooking,
  updateBooking,
  deleteBooking,
};
