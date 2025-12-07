import express from "express";
import { userControllers } from "./user.controller";
import logger from "../../middleware/logger";
import auth from "../../middleware/auth";

// const router = Router()
//*-------Or---------
const router = express.Router();

//!------Post a user router------
router.post("/", userControllers.createUser);

//!-------get all users router-------
router.get("/", logger, auth("admin"), userControllers.getUser);

//!-------get a user router-------
router.get("/:id",auth("admin", "user"), userControllers.getSingleUser);

//!-------update a user router-------
router.put("/:id", userControllers.updateUser);

//!-------delete a user router-------
router.delete("/:id", userControllers.deleteUser);

//*--------------------------------
export const userRouter = router;
