import mongoose, { Schema, Document } from 'mongoose';

export interface ISettlement extends Document {
  companyId: mongoose.Types.ObjectId;
  periodStart: Date;
  periodEnd: Date;
  totalRevenue: number;
  commissionAmount: number;
  payableAmount: number;
  status: 'PENDING' | 'PROCESSED' | 'PAID' | 'REJECTED';
  bankDetails: any;
  processedBy?: mongoose.Types.ObjectId;
  paidAt?: Date;
  transactionId?: string;
}

const SettlementSchema: Schema = new Schema(
  {
    companyId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    periodStart: { type: Date, required: true },
    periodEnd: { type: Date, required: true },
    totalRevenue: { type: Number, required: true },
    commissionAmount: { type: Number, required: true },
    payableAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ['PENDING', 'PROCESSED', 'PAID', 'REJECTED'],
      default: 'PENDING',
    },
    bankDetails: { type: Schema.Types.Mixed },
    processedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    paidAt: { type: Date },
    transactionId: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<ISettlement>('Settlement', SettlementSchema);
