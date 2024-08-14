import express from "express";
import {createFoodItem, deleteFoodItem, updateFoodItem} from "../controller/admin.controller";
import {adminVerify} from "../middlewares/admin-verify";
import {verifyToken} from "../middlewares/VerifyToken";

const router = express.Router();
router.post("/food/add",verifyToken, createFoodItem);
router.patch("/food/edit/:id",verifyToken, updateFoodItem);



router.delete("/food/:id",adminVerify, deleteFoodItem);

export default router;
