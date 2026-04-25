import { Schema, model } from 'mongoose';

const ServiceSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  icon: { type: String, default: '' },
  features: { type: [String], default: [] },
  category: { type: String, default: '' }
}, { timestamps: true });

export const Service = model('Service', ServiceSchema);


