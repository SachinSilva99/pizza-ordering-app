import express from "express";
import {UnAuthorizedError} from "../types/error/UnAuthorizedError";
import jwt, {Secret} from "jsonwebtoken";
import process from "process";
import {AdminUserModel} from "../model/admin.model";
import {tryCatch} from "../utils/TryCatch";
import {badRequest} from "../utils/constants";

export const adminVerify = tryCatch(async (req: express.Request, res: any, next: express.NextFunction) => {
  const token = req.headers.authorization;
  if (!token) {
    throw new UnAuthorizedError("InValid Token");
  }
  try {
    res.tokenData = jwt.verify(token, process.env.SECRET_KEY as Secret);
    const userId = res.tokenData.user._id;
    let adminUser = await AdminUserModel.findById(userId);
    if (!adminUser) {
      return res.status(badRequest).send({
        statusCode: badRequest,
        msg: "Invalid Admin token",
      });
    }
    next();
  } catch (error) {
    throw new UnAuthorizedError("InValid Token");
  }
});
