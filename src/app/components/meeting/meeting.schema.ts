import { Schema, model, Document } from "mongoose";

export interface MeetingDoc extends Document {
    _id?: string,
    name: string,
    start: Date,
    end: Date
    duration: number,
    members: string[],
    event?: any
};

const schema: Schema<MeetingDoc> = new Schema<MeetingDoc>({
    name: { type: String, required: true },
    start: { type: Date },
    end: { type: Date },
    duration: { type: Number },
    members: [{ type: Schema.Types.ObjectId, ref: 'Member' }],
    event: { type: Schema.Types.Mixed }
});

export default model<MeetingDoc>('Meeting', schema, 'meeting');