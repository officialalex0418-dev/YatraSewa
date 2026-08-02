import express from 'express';
import { addBus, getMyBuses, addRoute, getMyRoutes, getCompanyStats } from '../controllers/companyController';

const router = express.Router();

router.post('/buses', addBus);
router.get('/buses/:companyId', getMyBuses);

router.post('/routes', addRoute);
router.get('/routes/:companyId', getMyRoutes);

router.get('/stats/:companyId', getCompanyStats);

export default router;
