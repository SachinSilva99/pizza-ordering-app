import express from "express";
import {verifyToken} from "../middlewares/VerifyToken";
import {createOrder} from "../controller/order.controller";

const router = express.Router();
router.post("/",verifyToken, createOrder);
export default router;