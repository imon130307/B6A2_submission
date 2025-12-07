import { NextFunction, Request, Response } from "express";




const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(
    `"The logger function==>>",[${new Date().toISOString()}]\n "The method==>>", ${
      req.method
    }\n "The path ==>>", ${req.path}\n`
  );
  next();
};
export default logger;