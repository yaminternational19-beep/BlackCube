import { Schema, model } from 'mongoose';

const ContactSubmissionSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, default: '' },
  subject: { type: String, default: '' },
  service: { type: String, default: '' },
  company: { type: String, default: '' },
  message: { type: String, default: '' }
}, { timestamps: true });

export const ContactSubmission = model('ContactSubmission', ContactSubmissionSchema);


