import express from 'express';
import { getHotels, createHotel, updateHotel, deleteHotel } from '../controllers/hotelController.js';

const router = express.Router();

router.get('/', getHotels);
router.post('/', createHotel);
router.put('/:id', updateHotel);
router.delete('/:id', deleteHotel);

export default router;
