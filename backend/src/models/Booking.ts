import mongoose, { Schema, Document } from 'mongoose';

export interface IBooking extends Document {
  userId: mongoose.Types.ObjectId;
  tripId: mongoose.Types.ObjectId;
  seats: string[];
  totalAmount: number;
  paidAmount: number;
  paymentStatus: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';
  paymentMethod: 'ESEWA' | 'KHALTI' | 'CONNECT_IPS' | 'CASH' | 'WALLET';
  bookingStatus: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
  pointsEarned: number;
  pointsRedeemed: number;
  qrCode?: string;
}

const BookingSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    tripId: { type: Schema.Types.ObjectId, ref: 'Trip', required: true },
    seats: [{ type: String, required: true }],
    totalAmount: { type: Number, required: true },
    paidAmount: { type: Number, required: true },
    paymentStatus: {
      type: String,
      enum: ['PENDING', 'PAID', 'FAILED', 'REFUNDED'],
      default: 'PENDING',
    },
    paymentMethod: {
      type: String,
      enum: ['ESEWA', 'KHALTI', 'CONNECT_IPS', 'CASH', 'WALLET'],
    },
    bookingStatus: {
      type: String,
      enum: ['PENDING', 'CONFIRMED', 'CANCELLED'],
      default: 'PENDING',
    },
    pointsEarned: { type: Number, default: 0 },
    pointsRedeemed: { type: Number, default: 0 },
    qrCode: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IBooking>('Booking', BookingSchema);
