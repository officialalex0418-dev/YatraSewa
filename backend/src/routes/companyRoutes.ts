import express from 'express';
import {
  addBus,
  updateBus,
  getMyBuses,
  addSeatTemplate,
  getSeatTemplates,
  addRoute,
  getMyRoutes,
  addTrip,
  getMyTrips,
  addMaintenanceRecord,
  getCompanyStats
} from '../controllers/companyController';
import { protect, authorize } from '../middleware/authMiddleware';

const router = express.Router();

router.use(protect);
router.use(authorize('COMPANY'));

// Bus Management
router.post('/buses', addBus);
router.put('/buses/:id', updateBus);
router.get('/buses', getMyBuses);

// Seat Template Management
router.post('/templates', addSeatTemplate);
router.get('/templates', getSeatTemplates);

// Route Management
router.post('/routes', addRoute);
router.get('/routes', getMyRoutes);

// Trip Management
router.post('/trips', addTrip);
router.get('/trips', getMyTrips);

// Maintenance
router.post('/maintenance', addMaintenanceRecord);

// Dashboard
router.get('/stats', getCompanyStats);

export default router;
