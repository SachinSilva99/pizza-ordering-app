import {Request, Response} from 'express';
import {tryCatch} from "../utils/TryCatch";
import {FoodItemModel} from "../model/food-item.model";
import {StandardResponse} from "../dto/StandardResponse";
import {IFoodItem} from "../types/SchemaTypes";
import {ItemStatus, success} from "../utils/constants";


export const getFoodItems = tryCatch(async (req: Request, res: Response) => {
  const foodItems = await FoodItemModel.find({itemStatus:ItemStatus.ACTIVE});
  const response: StandardResponse<IFoodItem[]> = {
    statusCode: success,
    msg: "All food items",
    data: foodItems
  };
  res.status(success).send(response);
});


