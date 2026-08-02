import express from 'express';
import { createTrip, getAllTrips, getTripById } from '../controllers/tripController';

const router = express.Router();

router.post('/', createTrip);
router.get('/', getAllTrips);
router.get('/:id', getTripById);

export default router;
