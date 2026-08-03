import { Request, Response } from 'express';
import User from '../models/User';
import Bus from '../models/Bus';
import Trip from '../models/Trip';
import Booking from '../models/Booking';
import AuditLog from '../models/AuditLog';
import { sendWelcomeEmail } from '../services/emailService';
import crypto from 'crypto';

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

export const createCompany = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, address, panVat, ownerName, emergencyContact } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    const tempPassword = 'YaSe@3#21'; // Default temporary password

    const company = await User.create({
      name,
      email,
      phone,
      address,
      panVat,
      ownerName,
      emergencyContact,
      password: tempPassword,
      role: 'COMPANY',
      isApproved: true, // Admin created companies are auto-approved
    });

    // Send welcome email
    await sendWelcomeEmail(email, name, tempPassword);

    // Log action
    await AuditLog.create({
      adminId: (req as any).user._id,
      action: 'CREATE_COMPANY',
      targetModule: 'COMPANIES',
      targetId: company._id,
      newValue: company,
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'] || 'unknown',
    });

    res.status(201).json({ message: 'Company created successfully', company });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCompany = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const company = await User.findById(id);
    if (!company || company.role !== 'COMPANY') {
      return res.status(404).json({ message: 'Company not found' });
    }

    const previousValue = { ...company.toObject() };
    Object.assign(company, updateData);
    await company.save();

    // Log action
    await AuditLog.create({
      adminId: (req as any).user._id,
      action: 'UPDATE_COMPANY',
      targetModule: 'COMPANIES',
      targetId: id,
      previousValue,
      newValue: updateData,
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'] || 'unknown',
    });

    res.json({ message: 'Company updated successfully', company });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCompany = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const company = await User.findById(id);
    if (!company || company.role !== 'COMPANY') {
      return res.status(404).json({ message: 'Company not found' });
    }

    await User.findByIdAndDelete(id);

    // Log action
    await AuditLog.create({
      adminId: (req as any).user._id,
      action: 'DELETE_COMPANY',
      targetModule: 'COMPANIES',
      targetId: id,
      previousValue: company,
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'] || 'unknown',
    });

    res.json({ message: 'Company deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
