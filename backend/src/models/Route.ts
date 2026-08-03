import mongoose, { Schema, Document } from 'mongoose';

export interface IRoute extends Document {
  companyId: mongoose.Types.ObjectId;
  from: string;
  to: string;
  distance: string; // e.g. "200 km"
  duration: string; // e.g. "6h 30m"
  stops: {
    name: string;
    timeFromStart: string;
    isBoarding: boolean;
    isDropping: boolean;
    coordinates?: { lat: number; lng: number };
  }[];
  pickupPoints: {
    name: string;
    landmark?: string;
    address: string;
    phone?: string;
    timeOffset: number; // minutes from departure
    coordinates?: { lat: number; lng: number };
  }[];
  dropPoints: {
    name: string;
    landmark?: string;
    address: string;
    phone?: string;
    timeOffset: number; // minutes from departure
    coordinates?: { lat: number; lng: number };
  }[];
  isActive: boolean;
}

const RouteSchema: Schema = new Schema(
  {
    companyId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    distance: { type: String },
    duration: { type: String },
    stops: [
      {
        name: { type: String, required: true },
        timeFromStart: { type: String },
        isBoarding: { type: Boolean, default: true },
        isDropping: { type: Boolean, default: true },
        coordinates: { lat: Number, lng: Number },
      },
    ],
    pickupPoints: [
      {
        name: { type: String, required: true },
        landmark: { type: String },
        address: { type: String },
        phone: { type: String },
        timeOffset: { type: Number, default: 0 },
        coordinates: { lat: Number, lng: Number },
      },
    ],
    dropPoints: [
      {
        name: { type: String, required: true },
        landmark: { type: String },
        address: { type: String },
        phone: { type: String },
        timeOffset: { type: Number, default: 0 },
        coordinates: { lat: Number, lng: Number },
      },
    ],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model<IRoute>('Route', RouteSchema);
