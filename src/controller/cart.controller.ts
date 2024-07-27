import {Request, Response} from 'express';
import FoodItem from "../model/food-item.model";
import CartItem from "../model/cart-item.model";
import tryCatch from "../utils/TryCatch";
import {NotFoundError} from "../types/error/NotFoundError";


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
  res.json(cart);
});

