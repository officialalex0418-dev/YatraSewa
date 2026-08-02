import mongoose, { Schema, Document } from 'mongoose';

export interface IAuditLog extends Document {
  adminId: mongoose.Types.ObjectId;
  action: string;
  targetModule: string;
  targetId?: string;
  previousValue?: any;
  newValue?: any;
  ipAddress: string;
  userAgent: string;
  reason?: string;
  createdAt: Date;
}

const AuditLogSchema: Schema = new Schema(
  {
    adminId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    action: { type: String, required: true },
    targetModule: { type: String, required: true },
    targetId: { type: String },
    previousValue: { type: Schema.Types.Mixed },
    newValue: { type: Schema.Types.Mixed },
    ipAddress: { type: String, required: true },
    userAgent: { type: String, required: true },
    reason: { type: String },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default mongoose.model<IAuditLog>('AuditLog', AuditLogSchema);
