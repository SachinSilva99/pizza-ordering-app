import express from "express";
import {verifyToken} from "../middlewares/VerifyToken";
import {createOrder, getOrders} from "../controller/order.controller";

const router = express.Router();
router.post("/",verifyToken, createOrder);
router.get("/",verifyToken, getOrders);
export default router;