import {Request, Response} from 'express';
import FoodItem from "../model/food-item.model";
import CartItem from "../model/cart-item.model";
import tryCatch from "../utils/TryCatch";
import {NotFoundError} from "../types/error/NotFoundError";
import {StandardResponse} from "../dto/StandardResponse";
import {success} from "../utils/constants";


export const addToCart = tryCatch(async (req: Request, res: Response) => {

  const {userId, foodItemId, quantity} = req.body;
  const foodItem = await FoodItem.findById(foodItemId);
  if (!foodItem) {
    throw new NotFoundError("Food item not found");
  }

  let cart = await CartItem.findOne({user: userId});
  if (!cart) {
    cart = new CartItem({user: userId, items: [], total: 0});
  }
  cart.items.push({foodItem: foodItemId, quantity});
  cart.total += foodItem.price * quantity;
  await cart.save();
  const response: StandardResponse<string> = {statusCode: success, msg: "Item added to cart successfully!"};
  res.status(success).send(response);
});

