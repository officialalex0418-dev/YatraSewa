import mongoose, { Schema, Document } from 'mongoose';

export interface ICoupon extends Document {
  code: string;
  type: 'FLAT' | 'PERCENTAGE';
  value: number;
  maxDiscount?: number;
  minBookingAmount: number;
  expiryDate: Date;
  usageLimit: number;
  usedCount: number;
  status: 'ACTIVE' | 'EXPIRED' | 'DISABLED';
  createdBy: mongoose.Types.ObjectId;
  companyId?: mongoose.Types.ObjectId; // Optional, if specific to a company
}

const CouponSchema: Schema = new Schema(
  {
    code: { type: String, required: true, unique: true, uppercase: true },
    type: { type: String, enum: ['FLAT', 'PERCENTAGE'], required: true },
    value: { type: Number, required: true },
    maxDiscount: { type: Number },
    minBookingAmount: { type: Number, default: 0 },
    expiryDate: { type: Date, required: true },
    usageLimit: { type: Number, default: 100 },
    usedCount: { type: Number, default: 0 },
    status: { type: String, enum: ['ACTIVE', 'EXPIRED', 'DISABLED'], default: 'ACTIVE' },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    companyId: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

export default mongoose.model<ICoupon>('Coupon', CouponSchema);
