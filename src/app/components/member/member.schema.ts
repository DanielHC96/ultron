import { Schema, model, Document } from "mongoose";

export interface MemberDoc extends Document {
  _id: string;
  discordUserId: string;
  alias: string;
  firstName?: string;
  lastName?: string;
  updatedAt?: Date;
  createdAt?: Date;
};

const schema: Schema<MemberDoc> = new Schema<MemberDoc>({
  discordUserId: { type: String, required: true, unique: true },
  alias: { type: String, required: true },
  firstName: { type: String, default: null},
  lastName: { type: String, default: null},
  updatedAt: { type: Date },
  createdAt: { type: Date }
});

schema.index({ discordUserId: 1 });

export default model<MemberDoc>('Member', schema, 'member');