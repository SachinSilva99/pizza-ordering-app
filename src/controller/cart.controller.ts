import {Request, Response} from 'express';
import {FoodItemModel} from "../model/food-item.model";
import {tryCatch} from "../utils/TryCatch";
import {NotFoundError} from "../types/error/NotFoundError";
import {StandardResponse} from "../dto/StandardResponse";
import {success} from "../utils/constants";
import {CartItemModel} from "../model/cart-item.model";
import {CommonError} from "../types/error/CommonError";
import {CartItem} from "../types/SchemaTypes";


export const addToCart = tryCatch(async (req: Request, res: Response) => {// @ts-ignore
  // @ts-ignore
  const userId = res.tokenData.user._id; // logged in userId
  const {foodItemId, quantity} = req.body;

  const foodItem = await FoodItemModel.findById(foodItemId);
  if (!foodItem) {
    throw new NotFoundError("Food item not found");
  }
  if (foodItem.qty <= quantity) {
    throw new CommonError("Quantity exceeds than remaining quantity");
  }

  let cart = await CartItemModel.findOne({user: userId});
  if (!cart) {
    cart = new CartItemModel({user: userId, items: [], total: 0});
  }

  const existingItem = cart.items.find(item => item.foodItem.toString() === foodItemId);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({foodItem: foodItemId, quantity});
  }
  cart.total += foodItem.price * quantity;
  await cart.save();
  foodItem.qty -= quantity;
  await foodItem.save();
  const response: StandardResponse<string> = {statusCode: success, msg: "Item added to cart successfully!"};
  res.status(success).send(response);
});

export const removeFromCart = tryCatch(async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = res.tokenData.user._id; // logged in userId
  const {foodItemId, quantity} = req.body;

  const foodItem = await FoodItemModel.findById(foodItemId);
  if (!foodItem) {
    throw new NotFoundError("Food item not found");
  }

  let cart = await CartItemModel.findOne({user: userId});
  if (!cart) {
    throw new NotFoundError("Cart is empty!");
  }

  const existingItem = cart.items.find(item => item.foodItem.toString() === foodItemId);
  if (!existingItem) {
    throw new NotFoundError("Item not found in cart");
  }

  if (existingItem.quantity < quantity) {
    throw new CommonError("Quantity to remove exceeds quantity in cart");
  }

  existingItem.quantity -= quantity;
  if (existingItem.quantity === 0) {
    cart.items = cart.items.filter(item => item.foodItem.toString() !== foodItemId);
  }


  cart.total -= foodItem.price * quantity;
  if (cart.total < 0) cart.total = 0;
  await cart.save();
  foodItem.qty += quantity;
  await foodItem.save();
  const response: StandardResponse<string> = {statusCode: success, msg: "Item removed from cart successfully!"};
  res.status(success).send(response);
});

export const getCartItems = tryCatch(async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = res.tokenData.user._id; // logged in userId
  let cart = await CartItemModel.findOne({user: userId}).populate({path: 'items.foodItem'});
  if (!cart) {
    throw new CommonError("Cart is empty!");
  }
  const response: StandardResponse<CartItem> = {
    statusCode: success,
    msg: "Cart items",
    data: cart
  };
  res.status(success).send(response);
});