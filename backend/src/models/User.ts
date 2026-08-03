import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  role: 'SUPER_ADMIN' | 'COMPANY' | 'MANAGER' | 'COUNTER_STAFF' | 'DRIVER' | 'CONDUCTOR' | 'CUSTOMER';
  phone?: string;
  walletBalance: number;
  yatraPoints: number;
  isApproved: boolean;
  address?: string;
  panVat?: string;
  ownerName?: string;
  emergencyContact?: string;
  comparePassword(password: string): Promise<boolean>;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    role: {
      type: String,
      enum: ['SUPER_ADMIN', 'COMPANY', 'MANAGER', 'COUNTER_STAFF', 'DRIVER', 'CONDUCTOR', 'CUSTOMER'],
      default: 'CUSTOMER',
    },
    phone: { type: String },
    walletBalance: { type: Number, default: 0 },
    yatraPoints: { type: Number, default: 0 },
    isApproved: { type: Boolean, default: false }, // For company/operator accounts
    address: { type: String },
    panVat: { type: String },
    ownerName: { type: String },
    emergencyContact: { type: String },
  },
  { timestamps: true }
);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password as string, salt);
  next();
});

UserSchema.methods.comparePassword = async function (password: string) {
  return bcrypt.compare(password, this.password as string);
};

export default mongoose.model<IUser>('User', UserSchema);
