import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  description: string;
  members: string[];
}

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  members: [{ type: String, required: true }]
}, { timestamps: true });

const Team: Model<ITeam> = mongoose.model<ITeam>('Team', teamSchema);

export default Team;
