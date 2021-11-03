import { Schema, model, Document} from "mongoose";

export interface ProjectDoc extends Document {
    _id: string;
    member: string;
    time: number;
    start: Date;
    end: Date;
};

const schema: Schema<ProjectDoc> = new Schema<ProjectDoc> ({
    member: { type: Schema.Types.ObjectId, ref: 'Member' },
    time: { type: Number },
    start: { type: Date },
    end: { type: Date }
})

export default model<ProjectDoc>('Project', schema, 'project');