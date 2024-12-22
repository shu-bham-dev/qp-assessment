import { Request, Response } from 'express';
import { prisma } from '../models/prismaClient';

export const getGroceryItems = async (req: Request, res: Response) => {
  try {
    const items = await prisma.groceryItem.findMany();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { userId, groceryItems } = req.body;
    let totalAmount = 0;

    for (const item of groceryItems) {
      const groceryItem = await prisma.groceryItem.findUnique({
        where: { id: item.id },
      });
      if (groceryItem && groceryItem.inventory >= item.quantity) {
        totalAmount += groceryItem.price * item.quantity;
        await prisma.groceryItem.update({
          where: { id: item.id },
          data: { inventory: groceryItem.inventory - item.quantity },
        });
        await prisma.order.create({
          data: {
            userId,
            groceryItemId: item.id,
            quantity: item.quantity,
            totalAmount,
          },
        });
      } else {
        return res.status(400).json({ message: `Not enough stock for ${item.name}` });
      }
    }

    res.status(201).json({ message: 'Order created successfully', totalAmount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
