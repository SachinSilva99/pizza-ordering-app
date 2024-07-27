import express from "express";
import {verifyToken} from "../middlewares/VerifyToken";
import {getFoodItems} from "../controller/food-item.controller";

const router = express.Router();
router.get("/all",verifyToken, getFoodItems);
export default router;