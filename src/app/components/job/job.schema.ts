import { Schema, model, Document } from "mongoose";

export interface JobDoc extends Document {
    _id: string;
    name: string;
    selector: string;
    sessions: string[];
};

const schema: Schema<JobDoc> = new Schema<JobDoc> ({
    name: { type: String, required: true },
    selector: { type: String, required: true},
    sessions: [{ type: Schema.Types.ObjectId, ref: 'Session' }],
});

export default model<JobDoc>('Job', schema, 'job');