import {tryCatch} from "../utils/TryCatch";
import {Request, Response} from "express";
import {IFoodItem} from "../types/SchemaTypes";
import {FoodItemModel} from "../model/food-item.model";
import {StandardResponse} from "../dto/StandardResponse";
import {success} from "../utils/constants";
import {NotFoundError} from "../types/error/NotFoundError";

export const createFoodItem = tryCatch(async (req: Request, res: Response) => {
  const company: IFoodItem = req.body;
  const foodItemModel = new FoodItemModel(company);
  const savedFoodItem = await foodItemModel.save();
  const response: StandardResponse<string> = {
    statusCode: success,
    msg: "Food Item created successfully",
    data: savedFoodItem._id.toString()
  }
  res.status(success).send(response);
});

// Update Food Item
export const updateFoodItem = tryCatch(async (req: Request, res: Response) => {
  const {id} = req.params;
  const foodItemUpdates: Partial<IFoodItem> = req.body;
  const updatedFoodItem = await FoodItemModel.findByIdAndUpdate(id, foodItemUpdates, {new: true});

  if (!updatedFoodItem) {
    throw new NotFoundError("Food Item not found!");
  }

  const response: StandardResponse<string> = {
    statusCode: success,
    msg: "Food Item updated successfully",
    data: updatedFoodItem._id.toString()
  }
  res.status(success).send(response);
});