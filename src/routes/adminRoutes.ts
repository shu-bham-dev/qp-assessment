import express from 'express';
import { addGroceryItem, getGroceryItems } from '../controllers/adminController';

const router = express.Router();

router.post('/grocery-items', addGroceryItem);
router.get('/grocery-items', getGroceryItems);

export default router;
