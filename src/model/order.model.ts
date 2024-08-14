import {Schema, model} from 'mongoose';
import {IFoodItem} from "../types/SchemaTypes";

export interface Order {
  _id: string;
  items: { foodItem: IFoodItem, quantity: number }[],
  total: number;
  status: string,
  createdAt: Date
}

const orderSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  items: [{
    foodItem: {type: Schema.Types.ObjectId, ref: 'FoodItem', required: true},
    quantity: {type: Number, required: true}
  }],
  total: {type: Number, required: true},
  status: {type: String, enum: ['pending', 'completed', 'cancelled'], default: 'pending'},
  createdAt: {type: Date, default: Date.now}
});

export const OrderModel = model<Order>('Order', orderSchema);

