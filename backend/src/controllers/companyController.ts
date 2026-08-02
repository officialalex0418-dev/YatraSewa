import { Request, Response } from 'express';
import Bus from '../models/Bus';
import Route from '../models/Route';
import Trip from '../models/Trip';
import Booking from '../models/Booking';

// Bus Management
export const addBus = async (req: Request, res: Response) => {
  try {
    const bus = await Bus.create(req.body);
    res.status(201).json(bus);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyBuses = async (req: Request, res: Response) => {
  try {
    const buses = await Bus.find({ companyId: req.params.companyId });
    res.json(buses);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Route Management
export const addRoute = async (req: Request, res: Response) => {
  try {
    const route = await Route.create(req.body);
    res.status(201).json(route);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyRoutes = async (req: Request, res: Response) => {
  try {
    const routes = await Route.find({ companyId: req.params.companyId });
    res.json(routes);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Dashboard Stats
export const getCompanyStats = async (req: Request, res: Response) => {
  try {
    const { companyId } = req.params;
    const totalBuses = await Bus.countDocuments({ companyId });
    const totalTrips = await Trip.countDocuments({ companyId });

    // Revenue from confirmed bookings
    const trips = await Trip.find({ companyId });
    const tripIds = trips.map(t => t._id);
    const bookings = await Booking.find({ tripId: { $in: tripIds }, bookingStatus: 'CONFIRMED' });

    const totalRevenue = bookings.reduce((sum, b) => sum + b.paidAmount, 0);
    const totalTickets = bookings.length;

    res.json({
      totalBuses,
      totalTrips,
      totalRevenue,
      totalTickets,
      recentBookings: bookings.slice(0, 5)
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
