import { prisma } from '../models/prismaClient';
import { Order, GroceryItem } from '@prisma/client';

interface OrderItem {
  id: number;
  quantity: number;
}

export const createOrder = async (userId: number, groceryItems: OrderItem[]): Promise<Order[]> => {
  let totalAmount = 0;
  const orderPromises: Promise<Order>[] = [];

  try {
    for (const item of groceryItems) {
      const groceryItem: GroceryItem | null = await prisma.groceryItem.findUnique({
        where: { id: item.id },
      });

      if (!groceryItem) {
        throw new Error(`Grocery item with ID ${item.id} not found`);
      }

      if (groceryItem.inventory < item.quantity) {
        throw new Error(`Not enough stock for item: ${groceryItem.name}`);
      }

      totalAmount += groceryItem.price * item.quantity;

      // Update inventory
      await prisma.groceryItem.update({
        where: { id: groceryItem.id },
        data: { inventory: groceryItem.inventory - item.quantity },
      });

      // Create order record
      const newOrder = prisma.order.create({
        data: {
          userId,
          groceryItemId: item.id,
          quantity: item.quantity,
          totalAmount,
        },
      });

      orderPromises.push(newOrder);
    }

    // Wait for all order promises to resolve
    const orders = await Promise.all(orderPromises);

    return orders;
  } catch (error) {
    throw new Error(`Error creating order: ${error.message}`);
  }
};
