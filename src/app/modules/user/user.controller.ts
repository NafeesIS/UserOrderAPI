/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { TOrders, IUser } from './user.interface';
import { userService } from './user.service';
import { ordersSchema, userValidSchema } from './user.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const zodParseData = userValidSchema.userCreateValidSchema.parse(userData);

    const result = await userService.createUser(zodParseData);

    res.status(201).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'something went wrong',
      err: error,
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userService.getAllUser();

    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      messages: 'user not found!',
      error: {
        code: 404,
        description: 'user not found',
      },
    });
  }
};
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await userService.getSingleUser(parseInt(userId));

    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message || 'user not found!',
      error: {
        code: 404,
        description: 'user not found',
      },
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const userData: IUser = req.body;
    const zodParseData = userValidSchema.userUpdateValidSchema.parse(userData);

    const result = await userService.updateUser(parseInt(userId), zodParseData);
    res.status(200).json({
      status: 'success',
      message: 'User updated successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    await userService.deleteUser(parseInt(userId));

    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      messages: error.message || 'Something went wrong',
      error: {
        code: 404,
        description: 'user not found',
      },
    });
  }
};

const addOrderUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const orderData: TOrders = req.body;
    const zodParseData = ordersSchema.parse(orderData);
    await userService.addOrderUser(parseInt(userId), zodParseData);
    res.status(200).json({
      status: 'success',
      message: 'Order created successfully!',
      data: null,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

const getUserOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await userService.getUserOrders(parseInt(userId));

    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message || 'user not found!',
      error: {
        code: 404,
        description: 'user not found',
      },
    });
  }
};
const getUserTotalPrice = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await userService.getUserTotalPrice(parseInt(userId));

    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: result.length > 0 ? result : { totalPrice: 0 },
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message || 'user not found!',
      error: {
        code: 404,
        description: 'user not found',
      },
    });
  }
};

export const userController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  addOrderUser,
  getUserOrders,
  getUserTotalPrice,
};
