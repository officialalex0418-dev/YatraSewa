import { Request, Response } from 'express';
import Bus from '../models/Bus';
import Route from '../models/Route';
import Trip from '../models/Trip';
import Booking from '../models/Booking';
import SeatTemplate from '../models/SeatTemplate';
import Maintenance from '../models/Maintenance';

// Bus Management
export const addBus = async (req: Request, res: Response) => {
  try {
    const bus = await Bus.create({ ...req.body, companyId: (req as any).user._id });
    res.status(201).json(bus);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBus = async (req: Request, res: Response) => {
  try {
    const bus = await Bus.findOneAndUpdate(
      { _id: req.params.id, companyId: (req as any).user._id },
      req.body,
      { new: true }
    );
    res.json(bus);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyBuses = async (req: Request, res: Response) => {
  try {
    const buses = await Bus.find({ companyId: (req as any).user._id }).populate('seatLayoutId');
    res.json(buses);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Seat Template Management
export const addSeatTemplate = async (req: Request, res: Response) => {
  try {
    const template = await SeatTemplate.create({ ...req.body, companyId: (req as any).user._id });
    res.status(201).json(template);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getSeatTemplates = async (req: Request, res: Response) => {
  try {
    const templates = await SeatTemplate.find({ companyId: (req as any).user._id });
    res.json(templates);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Route Management
export const addRoute = async (req: Request, res: Response) => {
  try {
    const route = await Route.create({ ...req.body, companyId: (req as any).user._id });
    res.status(201).json(route);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyRoutes = async (req: Request, res: Response) => {
  try {
    const routes = await Route.find({ companyId: (req as any).user._id });
    res.json(routes);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Trip Management
export const addTrip = async (req: Request, res: Response) => {
  try {
    const { busId, routeId, departureTime, arrivalTime, baseFare } = req.body;

    const bus = await Bus.findById(busId);
    const route = await Route.findById(routeId);

    if (!bus || !route) {
      return res.status(404).json({ message: 'Bus or Route not found' });
    }

    // Validation: Check if bus is already assigned to a trip at this time
    const existingTrip = await Trip.findOne({
      busId,
      $or: [
        { departureTime: { $lt: arrivalTime, $gte: departureTime } },
        { arrivalTime: { $gt: departureTime, $lte: arrivalTime } }
      ],
      status: { $in: ['SCHEDULED', 'BOARDING', 'IN_TRANSIT'] }
    });

    if (existingTrip) {
      return res.status(400).json({ message: 'Bus is already assigned to another trip during this time.' });
    }

    const trip = await Trip.create({
      ...req.body,
      companyId: (req as any).user._id,
      busNumber: bus.busNumber,
      busType: bus.busType,
      routeFrom: route.from,
      routeTo: route.to,
      totalSeats: bus.totalSeats,
    });

    res.status(201).json(trip);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyTrips = async (req: Request, res: Response) => {
  try {
    const trips = await Trip.find({ companyId: (req as any).user._id })
      .populate('busId')
      .populate('routeId')
      .sort({ departureTime: 1 });
    res.json(trips);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Maintenance Management
export const addMaintenanceRecord = async (req: Request, res: Response) => {
  try {
    const record = await Maintenance.create({ ...req.body, companyId: (req as any).user._id });
    // Update bus status if maintenance is in progress
    if (req.body.status !== 'COMPLETED') {
      await Bus.findByIdAndUpdate(req.body.busId, { status: 'MAINTENANCE' });
    }
    res.status(201).json(record);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Dashboard Stats
export const getCompanyStats = async (req: Request, res: Response) => {
  try {
    const companyId = (req as any).user._id;
    const totalBuses = await Bus.countDocuments({ companyId });
    const activeBuses = await Bus.countDocuments({ companyId, status: 'ACTIVE' });
    const totalTrips = await Trip.countDocuments({ companyId });

    const trips = await Trip.find({ companyId });
    const tripIds = trips.map(t => t._id);
    const bookings = await Booking.find({ tripId: { $in: tripIds }, bookingStatus: 'CONFIRMED' });

    const totalRevenue = bookings.reduce((sum, b) => sum + b.paidAmount, 0);

    res.json({
      totalBuses,
      activeBuses,
      totalTrips,
      totalRevenue,
      recentBookings: bookings.slice(0, 5)
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
