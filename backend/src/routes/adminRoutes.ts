import express from 'express';
import {
  getGlobalStats,
  approveCompany,
  getAllCompanies,
  getAllCustomers,
  createCompany,
  updateCompany,
  deleteCompany
} from '../controllers/adminController';
import { getFinancialSummary, createSettlement } from '../controllers/financeController';
import { protect, authorize } from '../middleware/authMiddleware';

const router = express.Router();

// Apply protection to all admin routes
router.use(protect);
router.use(authorize('SUPER_ADMIN'));

// Stats & Overview
router.get('/stats', getGlobalStats);

// Company Management
router.get('/companies', getAllCompanies);
router.post('/companies', createCompany);
router.put('/companies/:id', updateCompany);
router.delete('/companies/:id', deleteCompany);
router.post('/companies/:companyId/approve', approveCompany);

// Customer Management
router.get('/customers', getAllCustomers);

// Finance & Settlements
router.get('/finance/summary', getFinancialSummary);
router.post('/finance/settlements', createSettlement);

export default router;
