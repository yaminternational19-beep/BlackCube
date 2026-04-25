import { Schema, model } from 'mongoose';

const AdminUserSchema = new Schema({
  email: { type: String, required: true, unique: true, index: true },
  name: { type: String, default: 'Administrator' },
  passwordHash: { type: String, required: true },
  role: { type: String, default: 'admin' },
}, { timestamps: true });

export const AdminUser = model('AdminUser', AdminUserSchema);


