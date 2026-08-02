import { Request, Response } from 'express';
import Trip from '../models/Trip';

export const createTrip = async (req: Request, res: Response) => {
  try {
    const trip = await Trip.create(req.body);
    res.status(201).json(trip);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllTrips = async (req: Request, res: Response) => {
  try {
    const { from, to, date } = req.query;
    let query: any = {};

    if (from) query.routeFrom = new RegExp(from as string, 'i');
    if (to) query.routeTo = new RegExp(to as string, 'i');
    if (date) {
      const startOfDay = new Date(date as string);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(date as string);
      endOfDay.setHours(23, 59, 59, 999);
      query.departureTime = { $gte: startOfDay, $lte: endOfDay };
    }

    const trips = await Trip.find(query).populate('companyId', 'name');
    res.json(trips);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getTripById = async (req: Request, res: Response) => {
  try {
    const trip = await Trip.findById(req.params.id).populate('companyId', 'name');
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    res.json(trip);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
