import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import adminRoutes from './routes/adminRoutes';
import userRoutes from './routes/userRoutes';
import { PrismaClient } from '@prisma/client';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const port = process.env.PORT || 3000;

// Initialize Prisma Client
const prisma = new PrismaClient();

// Middleware setup
app.use(cors());
app.use(express.json());

// Admin routes
app.use('/admin', adminRoutes);

// User routes
app.use('/user', userRoutes);

// Home route (for testing)
app.get('/', (req: Request, res: Response) => {
  res.send('Grocery Booking API is running!');
});

// Error handling middleware (generic error handler)
app.use((err: any, req: Request, res: Response, next: any) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export { prisma };
