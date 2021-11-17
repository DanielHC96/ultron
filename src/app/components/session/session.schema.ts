import { Schema, model, Document } from "mongoose";

export interface SessionDoc extends Document {
  _id: string;
  member: string;
  team: string;
  time: number;
  start: Date;
  end: Date;
  updatedAt?: Date;
  createdAt?: Date;
};

const schema: Schema<SessionDoc> = new Schema<SessionDoc>({
  member: { type: Schema.Types.ObjectId, ref: 'Member' },
  team: { type: Schema.Types.ObjectId, ref: 'Team' },
  time: { type: Number },
  start: { type: Date },
  updatedAt: { type: Date },
  end: { type: Date },
  createdAt: { type: Date }
});

export default model<SessionDoc>('Session', schema, 'session');