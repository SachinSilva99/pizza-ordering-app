import {Schema} from "mongoose";
import {ItemStatus} from "../utils/constants";

export interface IFoodItem extends Document {
  name: string,
  category: string,
  subCategory: string,
  price: number,
  description: string,
  imageUrl: string
  qty: number,
  itemStatus: ItemStatus,
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



