import mongoose, { Schema, Document } from 'mongoose';

export interface IBus extends Document {
  companyId: mongoose.Types.ObjectId;
  busNumber: string; // Vehicle Plate Number
  busName: string;   // Internal fleet name
  registrationNumber: string;
  chassisNumber?: string;
  engineNumber?: string;
  manufacturer?: string;
  vehicleModel?: string;
  year?: number;
  color?: string;
  busType: 'AC' | 'NON_AC' | 'DELUXE' | 'SUPER_DELUXE';
  category: 'SLEEPER' | 'SEATER' | 'SEMI_SLEEPER';
  totalSeats: number;
  seatLayoutId: mongoose.Types.ObjectId; // Link to SeatTemplate
  amenities: string[];
  documents: {
    blueBook?: { url: string; expiryDate: Date };
    insurance?: { url: string; expiryDate: Date };
    fitnessCertificate?: { url: string; expiryDate: Date };
    routePermit?: { url: string; expiryDate: Date };
    pollutionCertificate?: { url: string; expiryDate: Date };
    images: string[];
  };
  status: 'ACTIVE' | 'IN_SERVICE' | 'MAINTENANCE' | 'SUSPENDED' | 'RETIRED';
}

const BusSchema: Schema = new Schema(
  {
    companyId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    busNumber: { type: String, required: true, unique: true },
    busName: { type: String, required: true },
    registrationNumber: { type: String, required: true, unique: true },
    chassisNumber: { type: String },
    engineNumber: { type: String },
    manufacturer: { type: String },
    vehicleModel: { type: String },
    year: { type: Number },
    color: { type: String },
    busType: { type: String, enum: ['AC', 'NON_AC', 'DELUXE', 'SUPER_DELUXE'], required: true },
    category: { type: String, enum: ['SLEEPER', 'SEATER', 'SEMI_SLEEPER'], required: true },
    totalSeats: { type: Number, required: true },
    seatLayoutId: { type: Schema.Types.ObjectId, ref: 'SeatTemplate' },
    amenities: [{ type: String }],
    documents: {
      blueBook: { url: String, expiryDate: Date },
      insurance: { url: String, expiryDate: Date },
      fitnessCertificate: { url: String, expiryDate: Date },
      routePermit: { url: String, expiryDate: Date },
      pollutionCertificate: { url: String, expiryDate: Date },
      images: [{ type: String }],
    },
    status: {
      type: String,
      enum: ['ACTIVE', 'IN_SERVICE', 'MAINTENANCE', 'SUSPENDED', 'RETIRED'],
      default: 'ACTIVE',
    },
  },
  { timestamps: true }
);

export default mongoose.model<IBus>('Bus', BusSchema);
