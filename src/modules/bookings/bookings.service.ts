import { pool } from "../../config/db";

//!-----bookings CRUD operation------

//!-----Post a booking------
const createBooking = async (customer_id: string,vehicle_id:string,rent_start_date:string,rent_end_date:string,status:string) => {
  const result = await pool.query(
    `INSERT INTO bookings(customer_id,vehicle_id,rent_start_date,rent_end_date,status) VALUES($1,$2,$3,$4,$5) RETURNING *`,
    [customer_id,vehicle_id,rent_start_date,rent_end_date,status]
  );
  return result;
};

//!-----get all bookings------
const getBookings = async () => {
  const result = await pool.query(`SELECT * FROM bookings`);
  return result;
};

//!-----get a booking------
const getSingleBooking = async (user_id: string) => {
  const result = await pool.query("SELECT * FROM bookings WHERE id = $1", [
    user_id,
  ]);
  return result;
};

//!-----update a booking------
const updateBooking = async (status:string, id: string) => {
  const result = await pool.query(
    "UPDATE bookings SET status=$1 WHERE id=$2 RETURNING *",
    [status, id]
  );
  return result;
};

//!-----delete a bookings------
const deleteBookings = async (id: string) => {
  const result = await pool.query("DELETE FROM bookings WHERE id=$1 RETURNING *", [
    id,
  ]);
  return result;
};

export const bookingsServices = {
  createBooking,
  getBookings,
  getSingleBooking,
  updateBooking,
  deleteBookings,
};
