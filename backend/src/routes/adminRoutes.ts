import express from 'express';
import { getGlobalStats, approveCompany, getAllCompanies, getAllCustomers } from '../controllers/adminController';
import { getFinancialSummary, createSettlement } from '../controllers/financeController';

const router = express.Router();

// Stats & Overview
router.get('/stats', getGlobalStats);

// Company Management
router.get('/companies', getAllCompanies);
router.post('/companies/:companyId/approve', approveCompany);

// Customer Management
router.get('/customers', getAllCustomers);

// Finance & Settlements
router.get('/finance/summary', getFinancialSummary);
router.post('/finance/settlements', createSettlement);

export default router;
