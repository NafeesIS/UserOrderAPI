import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../config';
import {
  TAddress,
  TFullName,
  TOrders,
  IUser,
  UserModel,
} from './user.interface';

const userNameSchema = new Schema<TFullName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Last Name is required'],
    trim: true,
  },
});
const userAddressSchema = new Schema<TAddress>({
  street: {
    type: String,
    required: [true, 'Street is required'],
  },
  city: {
    type: String,
    required: [true, 'City is required'],
  },
  country: {
    type: String,
    required: [true, 'Country is required'],
  },
});
const userOrdersSchema = new Schema<TOrders>({
  productName: {
    type: String,
    required: [true, 'Product name is required'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
  },
});

// user management Schema
const userSchema = new Schema<IUser, UserModel>({
  userId: {
    type: Number,
    unique: true,
    required: [true, 'User ID is required'],
  },
  username: {
    type: String,
    unique: true,
    trim: true,
    required: [true, 'Username is required'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  fullName: {
    type: userNameSchema,
    required: [true, 'Full Name is required'],
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  hobbies: {
    type: [String],
    required: [true, 'Hobbies are required'],
  },
  address: {
    type: userAddressSchema,
    required: [true, 'Address is required'],
  },
  orders: [userOrdersSchema],
});

// encrypted password
userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

userSchema.pre('find', function (next) {
  this.find({ isActive: { $ne: true } });
  next();
});

userSchema.statics.isUserExists = async function (userId: number) {
  const existsUser = await User.findOne({ userId });
  return existsUser;
};

export const User = model<IUser, UserModel>('User', userSchema);
