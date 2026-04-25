import { Schema, model } from 'mongoose';

const JobPostingSchema = new Schema({
  title: { type: String, required: true },
  department: { type: String, default: '' },
  location: { type: String, default: '' },
  type: { type: String, default: '' },
  description: { type: String, default: '' },
  requirements: { type: [String], default: [] },
  benefits: { type: [String], default: [] },
  salary: { type: String, default: '' },
  postedDate: { type: String, default: '' },
  deadline: { type: String, default: '' }
}, { timestamps: true });

export const JobPosting = model('JobPosting', JobPostingSchema);


