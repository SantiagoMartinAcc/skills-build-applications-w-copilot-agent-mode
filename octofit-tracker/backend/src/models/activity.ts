import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IActivity extends Document {
  type: string;
  durationMinutes: number;
  date: Date;
  userId: string;
}

const activitySchema = new Schema<IActivity>({
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  date: { type: Date, required: true },
  userId: { type: String, required: true }
}, { timestamps: true });

const Activity: Model<IActivity> = mongoose.model<IActivity>('Activity', activitySchema);

export default Activity;
