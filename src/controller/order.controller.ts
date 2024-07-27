import {Request, Response} from 'express';

import {tryCatch} from "../utils/TryCatch";
import {badRequest, success} from "../utils/constants";
import {StandardResponse} from "../dto/StandardResponse";
import {CartItemModel} from "../model/cart-item.model";
import {OrderModel} from "../model/order.model";


export const createOrder = tryCatch(async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = res.tokenData.user._id;//logged in userId
  const cart = await CartItemModel.findOne({user: userId}).populate('items.foodItem');
  if (!cart) return res.status(badRequest).json({error: 'Cart is empty'});

  const order = new OrderModel({
    user: userId,
    items: cart.items,
    total: cart.total
  });

  await order.save();
  await cart.deleteOne({user: userId});
  const response: StandardResponse<string> = {statusCode: success, msg: "Order placed successfully!"};
  res.status(success).send(response);
});


