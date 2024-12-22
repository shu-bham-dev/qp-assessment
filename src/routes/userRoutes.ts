import express from 'express';
import { getGroceryItems, createOrder } from '../controllers/userController';

const router = express.Router();

router.get('/grocery-items', getGroceryItems);
router.post('/orders', createOrder);

export default router;
