import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cart: [{ type: Schema.Types.ObjectId, ref: 'CartItem' }]
});

const User = model('User', userSchema);
export default User;


