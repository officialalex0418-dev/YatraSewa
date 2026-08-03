import mongoose, { Schema, Document } from 'mongoose';

export interface IMaintenance extends Document {
  companyId: mongoose.Types.ObjectId;
  busId: mongoose.Types.ObjectId;
  type: 'ROUTINE_SERVICE' | 'REPAIR' | 'EMERGENCY' | 'TYRE_CHANGE' | 'BODY_WORK';
  description: string;
  workshopName: string;
  odometerReading?: number;
  cost: number;
  serviceDate: Date;
  nextServiceDate?: Date;
  invoiceUrl?: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
}

const MaintenanceSchema: Schema = new Schema(
  {
    companyId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    busId: { type: Schema.Types.ObjectId, ref: 'Bus', required: true },
    type: {
      type: String,
      enum: ['ROUTINE_SERVICE', 'REPAIR', 'EMERGENCY', 'TYRE_CHANGE', 'BODY_WORK'],
      required: true,
    },
    description: { type: String, required: true },
    workshopName: { type: String, required: true },
    odometerReading: { type: Number },
    cost: { type: Number, required: true },
    serviceDate: { type: Date, required: true },
    nextServiceDate: { type: Date },
    invoiceUrl: { type: String },
    status: {
      type: String,
      enum: ['PENDING', 'IN_PROGRESS', 'COMPLETED'],
      default: 'COMPLETED',
    },
  },
  { timestamps: true }
);

export default mongoose.model<IMaintenance>('Maintenance', MaintenanceSchema);
