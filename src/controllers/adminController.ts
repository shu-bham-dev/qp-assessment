import { Request, Response } from 'express';
import { prisma } from '../models/prismaClient';

export const addGroceryItem = async (req: Request, res: Response) => {
  try {
    const { name, price, inventory } = req.body;
    const newItem = await prisma.groceryItem.create({
      data: {
        name,
        price,
        inventory,
      },
    });
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getGroceryItems = async (req: Request, res: Response) => {
  try {
    const items = await prisma.groceryItem.findMany();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
