import mongoose, { Schema, Document } from 'mongoose';

export interface IBus extends Document {
  companyId: mongoose.Types.ObjectId;
  busNumber: string;
  busName: string;
  busType: 'AC' | 'NON_AC' | 'DELUXE' | 'SUPER_DELUXE';
  totalSeats: number;
  seatLayout: string; // JSON string or identifier for layout
  amenities: string[];
  isAvailable: boolean;
}

const BusSchema: Schema = new Schema(
  {
    companyId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    busNumber: { type: String, required: true, unique: true },
    busName: { type: String, required: true },
    busType: { type: String, enum: ['AC', 'NON_AC', 'DELUXE', 'SUPER_DELUXE'], required: true },
    totalSeats: { type: Number, required: true },
    seatLayout: { type: String },
    amenities: [{ type: String }],
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model<IBus>('Bus', BusSchema);
