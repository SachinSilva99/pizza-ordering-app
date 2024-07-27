import express from "express";
import {verifyToken} from "../middlewares/VerifyToken";
import {addToCart} from "../controller/cart.controller";

const router = express.Router();
router.get("/add",verifyToken, addToCart);
export default router;
