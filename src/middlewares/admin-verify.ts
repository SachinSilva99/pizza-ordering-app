import express from "express";
import {UnAuthorizedError} from "../types/error/UnAuthorizedError";
import jwt, {Secret} from "jsonwebtoken";
import process from "process";
import {AdminUserModel} from "../model/admin.model";

export const adminVerify = (req: express.Request, res: any, next: express.NextFunction) => {
  const token = req.headers.authorization;
  if (!token) {
    throw new UnAuthorizedError("InValid Token");
  }
  try {
    res.tokenData = jwt.verify(token, process.env.SECRET_KEY as Secret);
    const userId = res.tokenData.user._id;
    let adminUser = AdminUserModel.findById(userId);
    if (!adminUser) {
      throw new UnAuthorizedError("InValid AdminUser");
    }
    next();
  } catch (error) {
    throw new UnAuthorizedError("InValid Token");
  }
}
