import { Request, Response } from 'express';
import User from '../models/User';
import Bus from '../models/Bus';
import Trip from '../models/Trip';
import Booking from '../models/Booking';
import AuditLog from '../models/AuditLog';

export const getGlobalStats = async (req: Request, res: Response) => {
  try {
    const totalCompanies = await User.countDocuments({ role: 'COMPANY' });
    const activeCompanies = await User.countDocuments({ role: 'COMPANY', isApproved: true });
    const pendingCompanies = await User.countDocuments({ role: 'COMPANY', isApproved: false });

    const totalCustomers = await User.countDocuments({ role: 'CUSTOMER' });
    const totalBuses = await Bus.countDocuments();
    const totalTrips = await Trip.countDocuments();

    const bookings = await Booking.find({ bookingStatus: 'CONFIRMED' });
    const totalRevenue = bookings.reduce((sum, b) => sum + b.paidAmount, 0);
    const totalBookings = await Booking.countDocuments();

    res.json({
      companies: { total: totalCompanies, active: activeCompanies, pending: pendingCompanies },
      customers: { total: totalCustomers },
      fleet: { totalBuses, totalTrips },
      finance: { totalRevenue, totalBookings },
      recentActivities: await AuditLog.find().sort({ createdAt: -1 }).limit(10).populate('adminId', 'name'),
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const approveCompany = async (req: Request, res: Response) => {
  try {
    const { companyId } = req.params;
    const company = await User.findById(companyId);

    if (!company || company.role !== 'COMPANY') {
      return res.status(404).json({ message: 'Company not found' });
    }

    company.isApproved = true;
    await company.save();

    // Log action
    await AuditLog.create({
      adminId: (req as any).user._id,
      action: 'APPROVE_COMPANY',
      targetModule: 'COMPANIES',
      targetId: companyId,
      newValue: { isApproved: true },
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'] || 'unknown',
    });

    res.json({ message: 'Company approved successfully', company });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllCompanies = async (req: Request, res: Response) => {
  try {
    const companies = await User.find({ role: 'COMPANY' }).sort({ createdAt: -1 });
    res.json(companies);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllCustomers = async (req: Request, res: Response) => {
  try {
    const customers = await User.find({ role: 'CUSTOMER' }).sort({ createdAt: -1 });
    res.json(customers);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
