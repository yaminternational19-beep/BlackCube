import { Schema, model, Types } from 'mongoose';

const JobApplicationSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, default: '' },
  position: { type: String, required: true },
  experience: { type: String, default: '' },
  coverLetter: { type: String, default: '' },
  resumeUrl: { type: String, default: '' },
  appliedDate: { type: String, default: '' },
  status: { type: String, enum: ['pending', 'reviewed', 'shortlisted', 'rejected'], default: 'pending' },
  jobId: { type: Types.ObjectId, ref: 'JobPosting', required: false },
  jobTitle: { type: String, default: '' }
}, { timestamps: true });

export const JobApplication = model('JobApplication', JobApplicationSchema);


