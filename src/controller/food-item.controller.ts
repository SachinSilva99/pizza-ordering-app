import {Request, Response} from 'express';
import FoodItem from "../model/food-item.model";
import tryCatch from "../utils/TryCatch";


export const getFoodItems = tryCatch(async (req: Request, res: Response) => {
  const foodItems = await FoodItem.find();
  res.json(foodItems);
});

