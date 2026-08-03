import mongoose, { Schema, Document } from 'mongoose';

export interface ITrip extends Document {
  companyId: mongoose.Types.ObjectId;
  busId: mongoose.Types.ObjectId;
  routeId: mongoose.Types.ObjectId;
  busNumber: string;
  busType: 'AC' | 'NON_AC' | 'DELUXE' | 'SUPER_DELUXE';
  routeFrom: string;
  routeTo: string;
  staff: {
    driverId?: mongoose.Types.ObjectId;
    conductorId?: mongoose.Types.ObjectId;
    assistantId?: mongoose.Types.ObjectId;
  };
  departureTime: Date;
  arrivalTime: Date;
  baseFare: number;
  totalSeats: number;
  bookedSeats: string[];
  intermediateFares: {
    from: string;
    to: string;
    fare: number;
  }[];
  pricingConfig: {
    isWeekend?: boolean;
    festivalMarkup?: number;
    discount?: number;
  };
  status: 'SCHEDULED' | 'BOARDING' | 'IN_TRANSIT' | 'COMPLETED' | 'CANCELLED' | 'DELAYED';
  isRecurring: boolean;
  recurrencePattern?: 'DAILY' | 'WEEKLY' | 'MONTHLY';
}

const TripSchema: Schema = new Schema(
  {
    companyId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    busId: { type: Schema.Types.ObjectId, ref: 'Bus', required: true },
    routeId: { type: Schema.Types.ObjectId, ref: 'Route', required: true },
    busNumber: { type: String, required: true },
    busType: { type: String, enum: ['AC', 'NON_AC', 'DELUXE', 'SUPER_DELUXE'], required: true },
    routeFrom: { type: String, required: true },
    routeTo: { type: String, required: true },
    staff: {
      driverId: { type: Schema.Types.ObjectId, ref: 'User' },
      conductorId: { type: Schema.Types.ObjectId, ref: 'User' },
      assistantId: { type: Schema.Types.ObjectId, ref: 'User' },
    },
    departureTime: { type: Date, required: true },
    arrivalTime: { type: Date, required: true },
    baseFare: { type: Number, required: true },
    totalSeats: { type: Number, required: true },
    bookedSeats: { type: [String], default: [] },
    intermediateFares: [
      {
        from: { type: String },
        to: { type: String },
        fare: { type: Number },
      },
    ],
    pricingConfig: {
      isWeekend: { type: Boolean, default: false },
      festivalMarkup: { type: Number, default: 0 },
      discount: { type: Number, default: 0 },
    },
    status: {
      type: String,
      enum: ['SCHEDULED', 'BOARDING', 'IN_TRANSIT', 'COMPLETED', 'CANCELLED', 'DELAYED'],
      default: 'SCHEDULED',
    },
    isRecurring: { type: Boolean, default: false },
    recurrencePattern: { type: String, enum: ['DAILY', 'WEEKLY', 'MONTHLY'] },
  },
  { timestamps: true }
);

export default mongoose.model<ITrip>('Trip', TripSchema);
