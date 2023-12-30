/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { TOrders, IUser } from './user.interface';
import { User } from './user.model';

const createUser = async (userData: IUser) => {
  if (await User.isUserExists(userData.userId)) {
    throw new Error('User Already Create');
  }

  const { password, ...result } = (await User.create(userData)).toObject();

  return result;
};

const getAllUser = async () => {
  const result = await User.find().select(
    'username fullName age email address',
  );
  return result;
};

const getSingleUser = async (userId: number) => {
  const result = await User.findOne({ userId }).select('-password');
  return result;
};

const updateUser = async (userId: number, userData: IUser) => {
  const result = await User.findOneAndUpdate(
    { userId },
    { $set: userData },
    { new: true },
  ).select('-password');

  return result;
};

const deleteUser = async (userId: number) => {
  const result = await User.updateOne({ userId }, { isActive: false });
  return result;
};

const addOrderUser = async (userId: number, orderData: TOrders) => {
  const result = await User.findOneAndUpdate(
    { userId },
    { $push: { orders: orderData } },
    { new: true },
  );
  return result;
};

const getUserOrders = async (userId: number) => {
  const result = await User.findOne({ userId }).select('order');
  return result;
};

const getUserTotalPrice = async (userId: number) => {
  const result = await User.aggregate([
    { $match: { userId } },
    { $unwind: '$orders' },
    {
      $group: {
        _id: null,
        totalPrice: {
          $sum: {
            $multiply: ['$orders.price', '$orders.quantity'],
          },
        },
      },
    },
    {
      $project: { totalPrice: 1 },
    },
  ]);
  return result;
};

export const userService = {
  createUser,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
  addOrderUser,
  getUserOrders,
  getUserTotalPrice,
};
