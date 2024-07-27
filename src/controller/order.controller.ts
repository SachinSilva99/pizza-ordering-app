import {Request, Response} from 'express';
import CartItem from "../model/cart-item.model";
import Order from "../model/order.model";
import tryCatch from "../utils/TryCatch";


export const createOrder = tryCatch(async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = res.tokenData.user._id;//logged in userId
  const cart = await CartItem.findOne({user: userId}).populate('items.foodItem');
  if (!cart) return res.status(400).json({error: 'Cart is empty'});

  const order = new Order({
    user: userId,
    items: cart.items,
    total: cart.total
  });

  await order.save();
  await cart.deleteOne({user: userId});
  res.json(order);
});


