import mongoose, { Schema, Document } from 'mongoose';

export interface ISupportTicket extends Document {
  userId: mongoose.Types.ObjectId;
  subject: string;
  description: string;
  category: 'BOOKING' | 'PAYMENT' | 'TECHNICAL' | 'COMPLAINT' | 'OTHER';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  messages: {
    senderId: mongoose.Types.ObjectId;
    message: string;
    attachments?: string[];
    createdAt: Date;
  }[];
  assignedTo?: mongoose.Types.ObjectId;
  closedAt?: Date;
}

const SupportTicketSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    subject: { type: String, required: true },
    description: { type: String, required: true },
    category: {
      type: String,
      enum: ['BOOKING', 'PAYMENT', 'TECHNICAL', 'COMPLAINT', 'OTHER'],
      default: 'OTHER',
    },
    priority: {
      type: String,
      enum: ['LOW', 'MEDIUM', 'HIGH', 'URGENT'],
      default: 'MEDIUM',
    },
    status: {
      type: String,
      enum: ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'],
      default: 'OPEN',
    },
    messages: [
      {
        senderId: { type: Schema.Types.ObjectId, ref: 'User' },
        message: { type: String },
        attachments: [{ type: String }],
        createdAt: { type: Date, default: Date.now },
      },
    ],
    assignedTo: { type: Schema.Types.ObjectId, ref: 'User' },
    closedAt: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model<ISupportTicket>('SupportTicket', SupportTicketSchema);
