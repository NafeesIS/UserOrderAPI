import { z } from 'zod';

const fullNameSchema = z.object({
  firstName: z.string().min(1).max(20),
  lastName: z.string().min(1).max(20),
});

const addressSchema = z.object({
  street: z.string().min(1),
  city: z.string().min(1),
  country: z.string().min(1),
});

export const ordersSchema = z.object({
  productName: z.string().min(1),
  price: z.number(),
  quantity: z.number().min(1),
});

const userCreateValidSchema = z.object({
  userId: z.number(),
  username: z.string().min(1),
  password: z.string().min(6).max(20),
  fullName: fullNameSchema,
  age: z.number(),
  email: z.string().min(1).email(),
  isActive: z.boolean().default(true),
  hobbies: z.array(z.string().min(1)),
  address: addressSchema,
  orders: z.array(ordersSchema).optional(),
});

const userUpdateValidSchema = z.object({
  userId: z.number(),
  username: z.string().min(1),
  password: z.string().min(6).max(20),
  fullName: fullNameSchema,
  age: z.number(),
  email: z.string().min(1).email(),
  isActive: z.boolean().default(true),
  hobbies: z.array(z.string().min(1)),
  address: addressSchema,
  orders: z.array(ordersSchema).optional(),
});

export const userValidSchema = {
  userCreateValidSchema,
  userUpdateValidSchema,
};
