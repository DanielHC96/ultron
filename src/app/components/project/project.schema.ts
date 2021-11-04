import { Schema, model, Document} from "mongoose";

export interface ProjectDoc extends Document {
    _id: string;
    projectName: string;
    member: string;
    time: number;
    start: Date;
    end: Date;
};

const schema: Schema<ProjectDoc> = new Schema<ProjectDoc> ({
    projectName: { type: String, required: true},
    member: { type: Schema.Types.ObjectId, ref: 'Member' },
    time: { type: Number },
    start: { type: Date },
    end: { type: Date }
})

export default model<ProjectDoc>('Project', schema, 'project');