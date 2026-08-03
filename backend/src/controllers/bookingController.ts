import { Request, Response } from 'express';
import Booking from '../models/Booking';
import Trip from '../models/Trip';
import User from '../models/User';
import { calculatePointsEarned, calculateRedemptionValue } from '../services/loyaltyService';

export const createBooking = async (req: Request, res: Response) => {
  try {
    const { userId, tripId, seats, pointsToRedeem, paymentMethod } = req.body;

    const trip = await Trip.findById(tripId);
    if (!trip) return res.status(404).json({ message: 'Trip not found' });

    // Check seat availability
    const unavailableSeats = seats.filter((seat: string) => trip.bookedSeats.includes(seat));
    if (unavailableSeats.length > 0) {
      return res.status(400).json({ message: `Seats ${unavailableSeats.join(', ')} are already booked` });
    }

    const totalAmount = trip.baseFare * seats.length;
    let redemptionDiscount = 0;

    if (pointsToRedeem > 0) {
      const user = await User.findById(userId);
      if (!user || user.yatraPoints < pointsToRedeem) {
        return res.status(400).json({ message: 'Insufficient Yatra Points' });
      }
      redemptionDiscount = calculateRedemptionValue(pointsToRedeem);
    }

    const paidAmount = totalAmount - redemptionDiscount;
    const pointsEarned = calculatePointsEarned(paidAmount);

    const booking = await Booking.create({
      userId,
      tripId,
      seats,
      totalAmount,
      paidAmount,
      paymentMethod,
      pointsEarned,
      pointsRedeemed: pointsToRedeem,
      paymentStatus: 'PAID', // In a real app, this would be 'PENDING' until payment gateway callback
      bookingStatus: 'CONFIRMED',
    });

    // Update trip booked seats
    trip.bookedSeats.push(...seats);
    await trip.save();

    // Update user points and wallet
    const user = await User.findById(userId);
    if (user) {
      user.yatraPoints -= pointsToRedeem;
      user.yatraPoints += pointsEarned;
      await user.save();
    }

    res.status(201).json(booking);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId }).populate('tripId');
    res.json(bookings);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
