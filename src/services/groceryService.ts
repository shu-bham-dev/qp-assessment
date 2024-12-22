import { prisma } from '../models/prismaClient';
import { GroceryItem } from '@prisma/client';

export const createGroceryItem = async (name: string, price: number, inventory: number): Promise<GroceryItem> => {
  try {
    const newItem = await prisma.groceryItem.create({
      data: {
        name,
        price,
        inventory,
      },
    });
    return newItem;
  } catch (error) {
    throw new Error(`Error creating grocery item: ${error.message}`);
  }
};

export const getAllGroceryItems = async (): Promise<GroceryItem[]> => {
  try {
    const items = await prisma.groceryItem.findMany();
    return items;
  } catch (error) {
    throw new Error(`Error fetching grocery items: ${error.message}`);
  }
};

export const updateGroceryItem = async (id: number, name?: string, price?: number, inventory?: number): Promise<GroceryItem> => {
  try {
    const updatedItem = await prisma.groceryItem.update({
      where: { id },
      data: {
        name,
        price,
        inventory,
      },
    });
    return updatedItem;
  } catch (error) {
    throw new Error(`Error updating grocery item: ${error.message}`);
  }
};

export const removeGroceryItem = async (id: number): Promise<GroceryItem> => {
  try {
    const removedItem = await prisma.groceryItem.delete({
      where: { id },
    });
    return removedItem;
  } catch (error) {
    throw new Error(`Error removing grocery item: ${error.message}`);
  }
};

export const updateInventory = async (id: number, quantity: number): Promise<GroceryItem> => {
  try {
    const updatedItem = await prisma.groceryItem.update({
      where: { id },
      data: {
        inventory: { increment: quantity },
      },
    });
    return updatedItem;
  } catch (error) {
    throw new Error(`Error updating inventory: ${error.message}`);
  }
};
