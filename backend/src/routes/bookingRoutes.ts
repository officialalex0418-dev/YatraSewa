import express from 'express';
import { createBooking, getMyBookings } from '../controllers/bookingController';

const router = express.Router();

router.post('/', createBooking);
router.get('/user/:userId', getMyBookings);

export default router;
