import mongoose, { Schema, Document } from 'mongoose';

export interface IRoute extends Document {
  companyId: mongoose.Types.ObjectId;
  from: string;
  to: string;
  distance: string;
  duration: string;
  stops: { name: string; timeFromStart: string }[];
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
        name: { type: String },
        timeFromStart: { type: String },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<IRoute>('Route', RouteSchema);
