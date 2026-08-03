import mongoose, { Schema, Document } from 'mongoose';

export interface ISeatTemplate extends Document {
  companyId: mongoose.Types.ObjectId;
  name: string;
  category: 'SLEEPER' | 'SEATER' | 'SEMI_SLEEPER' | 'VIP' | 'MINI_BUS' | 'HIACE';
  dimensions: {
    rows: number;
    cols: number;
  };
  layout: {
    seatNumber: string;
    row: number;
    col: number;
    type: 'STANDARD' | 'VIP' | 'SLEEPER' | 'SOFA' | 'PREMIUM' | 'STAFF';
    isWindow: boolean;
    isBlocked?: boolean;
    genderPreference?: 'NONE' | 'FEMALE_ONLY';
    priceMultiplier?: number;
  }[];
  totalSeats: number;
}

const SeatTemplateSchema: Schema = new Schema(
  {
    companyId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    category: {
      type: String,
      enum: ['SLEEPER', 'SEATER', 'SEMI_SLEEPER', 'VIP', 'MINI_BUS', 'HIACE'],
      required: true,
    },
    dimensions: {
      rows: { type: Number, required: true },
      cols: { type: Number, required: true },
    },
    layout: [
      {
        seatNumber: { type: String, required: true },
        row: { type: Number, required: true },
        col: { type: Number, required: true },
        type: {
          type: String,
          enum: ['STANDARD', 'VIP', 'SLEEPER', 'SOFA', 'PREMIUM', 'STAFF'],
          default: 'STANDARD',
        },
        isWindow: { type: Boolean, default: false },
        isBlocked: { type: Boolean, default: false },
        genderPreference: { type: String, enum: ['NONE', 'FEMALE_ONLY'], default: 'NONE' },
        priceMultiplier: { type: Number, default: 1.0 },
      },
    ],
    totalSeats: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<ISeatTemplate>('SeatTemplate', SeatTemplateSchema);
