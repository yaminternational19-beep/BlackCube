import { Schema, model } from 'mongoose';

const FieldSchema = new Schema({
  id: { type: String, required: true },
  label: { type: String, required: true },
  type: { type: String, required: true },
  value: { type: Schema.Types.Mixed },
  fields: [{ type: Schema.Types.Mixed }]
}, { _id: false });

const PageSchema = new Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  fields: { type: [FieldSchema], default: [] }
}, { timestamps: true });

export const Page = model('Page', PageSchema);


