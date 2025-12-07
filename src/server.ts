import express, { Request, Response } from "express";

import config from "./config";
import initDB from "./config/db";
import logger from "./middleware/logger";
import { userRouter } from "./modules/user/user.routes";
import { vehicleRouter } from "./modules/vehicles/vehicles.routes";
import { bookingsRouter } from "./modules/bookings/bookings.routes";
import { authRoutes } from "./modules/auth/auth.routes";


const app = express();
const port = config.port;

//!--adding parser for getting json data, known as middleware-----
app.use(express.json());

//!---creating table in Neon db-----
initDB();


//!---root route for test------
app.get("/", logger, (req: Request, res: Response) => {
  res.send('Hello,Your server is executed at "/" route!');
});


//!----User CRUP operation------
app.use("/users" ,  userRouter )


//!-----vehicles CRUD operation------
app.use("/vehicles", vehicleRouter)


//!-----Bookings CRUD operation------
app.use("/bookings", bookingsRouter)

//!-----Auth route-----
app.use("/auth" , authRoutes)

//!-----Not found route------
app.use((req, res) => {
  res.status(404).json({
    success: true,
    message: "Route is not found",
    path: req.path,
  });
});

//!---server is listening------
app.listen(port, () => {
  console.log(`Our server is listening on port ${port}`);
});
