import {Schema} from "mongoose";

export interface IFoodItem extends Document {
  name: string,
  category: string,
  subCategory: string,
  price: number,
  description: string,
  imageUrl: string
}

export interface IUser extends Document {
  username: string,
  email: string,
  password: string,
  address: string,
  image: string,
}
export interface CartItem extends Document {
  user: Schema.Types.ObjectId;
  items: {
    foodItem: Schema.Types.ObjectId;
    quantity: number;
  }[];
  total: number;
}



