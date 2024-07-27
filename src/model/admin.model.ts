import {Schema, model} from 'mongoose';
import {UserStatus} from "../utils/constants";

const userSchema = new Schema({
  username: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  address: {type: String, required: true},
  image: {type: String, required: true},
  status: {type: String, enum: UserStatus, default: UserStatus.ACTIVE},
});

export const AdminUserModel = model('AdminUser', userSchema);




