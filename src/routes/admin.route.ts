import express from "express";
import {createFoodItem} from "../controller/admin.controller";
import {adminVerify} from "../middlewares/admin-verify";

const router = express.Router();
router.post("/food/add",adminVerify, createFoodItem);

export default router;
