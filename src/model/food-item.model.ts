import {Schema, model} from 'mongoose';
import {ItemStatus} from "../utils/constants";

const foodItemSchema = new Schema({
  name: {type: String, required: true},
  category: {type: String, required: true, enum: ['PIZZA', 'PASTA', 'RICE']},
  subCategory: {type: String, enum: ['CLASSIC', 'SIGNATURE', 'PREMIUM']},
  price: {type: Number, required: true},
  description: {type: String},
  imageUrl: {type: String},
  qty:{type: Number, required: true},
  status: {type: String, enum: ItemStatus},
});

export const FoodItemModel = model('FoodItem', foodItemSchema);

