import { Schema, model, Document } from "mongoose";

export interface TeamDoc extends Document {
  _id: string;
  discordGuildId: string;
  name: string;
  members: string[];
  updatedAt?: Date;
  createdAt?: Date;
};

const schema: Schema<TeamDoc> = new Schema<TeamDoc>({
  discordGuildId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'Member' }],
  updatedAt: { type: Date },
  createdAt: { type: Date }
});

schema.index({ discordGuildId: 1 });

export default model<TeamDoc>('Team', schema, 'team');
