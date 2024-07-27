import express from "express";
import {verifyToken} from "../middlewares/VerifyToken";
import {addToCart, getCartItems, removeFromCart} from "../controller/cart.controller";

const router = express.Router();
router.post("/add",verifyToken, addToCart);
router.delete("/remove",verifyToken, removeFromCart);
router.get("/",verifyToken, getCartItems);
export default router;
