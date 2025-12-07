import { bookingsControllers } from "./bookings.controllers";
import express from "express";

// const router = Router()
//*-------Or---------
const router = express.Router();

//!-----Bookings CRUD operation------
//!-----Post a Vehicle------
router.post("/", bookingsControllers.createBooking);

//!-----get all Bookings------
router.get("/", bookingsControllers.getBookings);

//!-----get a Bookings------
router.get("/:id", bookingsControllers.getSingleBooking);

//!-----update a Bookings------
router.put("/:id", bookingsControllers.updateBooking);

//!-----delete a Bookings------
router.delete("/:id", bookingsControllers.deleteBooking);

//*--------------------------------
export const bookingsRouter = router;
