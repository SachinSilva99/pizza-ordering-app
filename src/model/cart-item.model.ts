import { Schema, model } from 'mongoose';

const cartItemSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    foodItem: { type: Schema.Types.ObjectId, ref: 'FoodItem', required: true },
    quantity: { type: Number, required: true }
  }],
  total: { type: Number, required: true }
});

const CartItem = model('CartItem', cartItemSchema);
export default CartItem;
