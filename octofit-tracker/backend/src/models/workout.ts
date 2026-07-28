import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IWorkout extends Document {
  name: string;
  focus: string;
  durationMinutes: number;
  difficulty: string;
}

const workoutSchema = new Schema<IWorkout>({
  name: { type: String, required: true, unique: true },
  focus: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  difficulty: { type: String, required: true }
}, { timestamps: true });

const Workout: Model<IWorkout> = mongoose.model<IWorkout>('Workout', workoutSchema);

export default Workout;
