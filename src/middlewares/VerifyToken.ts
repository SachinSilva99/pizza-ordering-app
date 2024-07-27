import process from "process";
import express from "express";
import jwt, {Secret} from "jsonwebtoken";
import {UnAuthorizedError} from "../types/error/UnAuthorizedError";

export const verifyToken = (req: express.Request, res: any, next: express.NextFunction) => {
  const token = req.headers.authorization;
  if (!token) {
    throw new UnAuthorizedError("InValid Token");
  }
  try {
    res.tokenData = jwt.verify(token, process.env.SECRET_KEY as Secret);
    next();
  } catch (error) {
    throw new UnAuthorizedError("InValid Token");
  }
}
