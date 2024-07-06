import mongoose, { Document, Model, Schema } from "mongoose";

interface ICopy {
  copy_id: string;
}

interface IDocument extends Document {
  title: string;
  availability: boolean;
  type: "book" | "periodical";
  year_of_publication?: number;
  publisher?: string;
  author?: string;
  periodicity?: "weekly" | "monthly" | "daily";
  date_of_publication?: Date;
  copies: ICopy[];
}

const CopySchema: Schema = new Schema({
  copy_id: { type: String, required: true, unique: true },
});

const DocumentSchema: Schema = new Schema({
  title: { type: String, required: true },
  availability: { type: Boolean, required: true },
  type: { type: String, required: true },
  year_of_publication: { type: Number },
  publisher: { type: String },
  author: { type: String },
  periodicity: { type: String },
  date_of_publication: { type: Date },
  copies: [CopySchema],
});

const DocumentModel: Model<IDocument> =
  mongoose.models.Document ||
  mongoose.model<IDocument>("Document", DocumentSchema);

export default DocumentModel;
