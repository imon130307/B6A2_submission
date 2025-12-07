import { Request, Response } from "express";
import { userServices } from "./user.service";



//!-------Post a user-------
const createUser = async (req: Request, res: Response) => {
  try {
    const result =await userServices.createUser(req.body)
    console.log(result.rows[0]);
    res.status(201).json({
      success: true,
      message: "Data is inserted successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
//!-------get all users-------
const getUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getUser();

    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      details: error,
    });
  }
}

//!-------get a user-------
const getSingleUser = async (req: Request, res: Response) => {
  // console.log(req.params.id)
  try {
    const result =await userServices.getSingleUser(req.params.id as string )

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "User is not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User fetched successfully",
        data: result.rows[0],
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}


//!-------update a user-------
const updateUser = async (req: Request, res: Response) => {
  // console.log(req.params.id)
  const { name, email,password,phone,role } = req.body;
  try {
    const result = await userServices.updateUser(name,email,password,phone,role, req.params.id!)

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "User is not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User is updated successfully",
        data: result.rows[0],
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

//!-------delete a user-------
const deleteUser = async (req: Request, res: Response) => {
  // console.log(req.params.id)
  try {
    const result = await userServices.deleteUser(req.params.id as string)

    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "User is not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User is deleted successfully",
        data: result.rows,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}


export const userControllers = {
    createUser,
    getUser,
    getSingleUser,
    updateUser,
    deleteUser
}