import mongoose, { Schema, Document } from 'mongoose';

export interface ITrip extends Document {
  companyId: mongoose.Types.ObjectId;
  busNumber: string;
  busType: 'AC' | 'NON_AC' | 'DELUXE' | 'SUPER_DELUXE';
  routeFrom: string;
  routeTo: string;
  departureTime: Date;
  arrivalTime: Date;
  fare: number;
  totalSeats: number;
  availableSeats: string[];
  bookedSeats: string[];
  status: 'SCHEDULED' | 'BOARDING' | 'IN_TRANSIT' | 'COMPLETED' | 'CANCELLED';
}

const TripSchema: Schema = new Schema(
  {
    companyId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    busNumber: { type: String, required: true },
    busType: { type: String, enum: ['AC', 'NON_AC', 'DELUXE', 'SUPER_DELUXE'], required: true },
    routeFrom: { type: String, required: true },
    routeTo: { type: String, required: true },
    departureTime: { type: Date, required: true },
    arrivalTime: { type: Date, required: true },
    fare: { type: Number, required: true },
    totalSeats: { type: Number, required: true },
    availableSeats: [{ type: String }],
    bookedSeats: [{ type: String }],
    status: {
      type: String,
      enum: ['SCHEDULED', 'BOARDING', 'IN_TRANSIT', 'COMPLETED', 'CANCELLED'],
      default: 'SCHEDULED',
    },
  },
  { timestamps: true }
);

export default mongoose.model<ITrip>('Trip', TripSchema);
