import express from "express";
import { getFoodItems} from "../controller/food-item.controller";

const router = express.Router();
router.get("/all", getFoodItems);
export default router;