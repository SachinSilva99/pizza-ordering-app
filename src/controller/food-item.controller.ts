import {Request, Response} from 'express';
import FoodItem from "../model/food-item.model";
import tryCatch from "../utils/TryCatch";
import {IFoodItem} from "../types/SchemaTypes";
import FoodItemModel from "../model/food-item.model";
import {StandardResponse} from "../dto/StandardResponse";
import {success} from "../utils/constants";


export const getFoodItems = tryCatch(async (req: Request, res: Response) => {
  const foodItems = await FoodItem.find();
  res.json(foodItems);
});
export const createFoodItem = tryCatch(async (req: Request, res: Response) => {
  const company: IFoodItem = req.body;
  const foodItemModel = new FoodItemModel(company);
  const savedCompany = await foodItemModel.save();
  const response: StandardResponse<string> = {
    statusCode: success,
    msg: "company created successfully",
    data: savedCompany._id.toString()
  }
  res.status(success).send(response);
});

