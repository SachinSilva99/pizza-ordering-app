import express from "express";
import {createFoodItem, deleteFoodItem, updateFoodItem} from "../controller/admin.controller";
import {adminVerify} from "../middlewares/admin-verify";

const router = express.Router();
router.post("/food/add",adminVerify, createFoodItem);
router.patch("/food/edit/:id",adminVerify, updateFoodItem);



router.delete("/food/:id",adminVerify, deleteFoodItem);

export default router;
