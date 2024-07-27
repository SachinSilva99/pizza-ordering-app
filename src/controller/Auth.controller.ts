import express, {Request, Response} from "express";
import UserModel from "../model/User.model";
import tryCatch from "../utils/TryCatch";
import {StandardResponse} from "../dto/StandardResponse";
import bcrypt from 'bcrypt';
import process from "process";
import jwt, {Secret} from "jsonwebtoken";
import {NotFoundError} from "../types/error/NotFoundError";
import {UnAuthorizedError} from "../types/error/UnAuthorizedError";
import {IUser} from "../types/SchemaTypes";
import {saltRounds, success, UserStatus} from "../utils/constants";



export const userSignUp = tryCatch(async (req: Request, res: Response) => {
  const user: IUser = req.body;
  user.password = await bcrypt.hash(user.password, saltRounds);
  await new UserModel(user).save();
  const response: StandardResponse<string> = {statusCode: success, msg: "sign up successful"}
  res.status(200).send(response);
});
// export const loginWithGoogle = tryCatch(async (req: Request, res: Response) => {
//   const user = await UserModel.findOne({email: req.body.email, deleteStatus: false});
//   if (!user) {
//     throw new NotFoundError(`${req.body.email} not found!`);
//   }
//   const token = jwt.sign({id: user._id}, process.env.SECRET_KEY as Secret);
//   user.password = "";
//   const resBody = {
//     user: user,
//     accessToken: token
//   }
//   const response: StandardResponse<any> = {statusCode: 200, data: resBody, msg: "Access"};
//   res.status(200).send(response);
// });
// export const signUpWithGoogle = tryCatch(async (req: Request, res: Response) => {
//   const generatedPassword = Math.random().toString(36).slice(-8);
//   const hashedPassword = await bcrypt.hash(generatedPassword, 10);
//   const newUser = new UserModel({
//     username:
//       req.body.fName.split(" ")[0].toLowerCase() +
//       Math.random().toString(36).slice(-8),
//     email: req.body.email,
//     password: hashedPassword,
//     avatar: req.body.avatar,
//     fName: req.body.fName,
//     userType: req.body.userType
//   });
//   const savedNewUser = await newUser.save();
//   savedNewUser.password = "";
//   const response: StandardResponse<string> = {statusCode: 201, msg: "sign up successful", data: savedNewUser._id}
//   res.status(200).send(response);
// });




export const login = tryCatch(async (req: Request, res: Response, next: express.NextFunction) => {
    const {email, password} = req.body;
    const user = await UserModel.findOne({email: email, status: UserStatus.ACTIVE});
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new UnAuthorizedError("InValid Credentials")
      }
      const expiresIn = "1w";
      user.password = "";
      jwt.sign({user}, process.env.SECRET_KEY as Secret, {expiresIn}, (err: any, token: any) => {
        if (err) {
          next();
          return;
        }
        const resBody = {
          user: user,
          accessToken: token
        }
        const response: StandardResponse<any> = {statusCode: success, data: resBody, msg: "Access"};
        res.status(success).send(response);
      });
      return;
    }
    throw new NotFoundError("User not found");
  }
)
