import { Schema, model } from 'mongoose';

const foodItemSchema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },  // e.g., "pizza", "pasta", "rice"
  subCategory: { type: String },               // e.g., "signature", "delight"
  price: { type: Number, required: true },
  description: { type: String },
  imageUrl: { type: String }
});

const FoodItem = model('FoodItem', foodItemSchema);
export default FoodItem;
