import express from "express";
import {verifyToken} from "../middlewares/VerifyToken";
import {createFoodItem, getFoodItems} from "../controller/food-item.controller";

const router = express.Router();
router.get("/all",verifyToken, getFoodItems);
router.post("/",verifyToken, createFoodItem);
export default router;