import { AdminUser } from '../models/AdminUser.js';
import bcrypt from 'bcryptjs';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { ok, paginated } from '../utils/ApiResponse.js';

export const listAdmins = asyncHandler(async (req, res) => {
  const page = parseInt((req.query.page) || '1', 10);
  const limit = parseInt((req.query.limit) || '10', 10);
  const q = (req.query.q) || '';
  const filter = q ? { email: { $regex: q, $options: 'i' } } : {};
  const [items, total] = await Promise.all([
    AdminUser.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
    AdminUser.countDocuments(filter)
  ]);
  res.json(paginated(items.map(i => ({ _id: i._id, email: i.email, name: i.name, role: i.role })), page, limit, total));
});

export const createAdmin = asyncHandler(async (req, res) => {
  const { email, password, name } = req.body || {};
  if (!email || !password) return res.status(400).json({ success: false, message: 'Email and password are required' });
  const existing = await AdminUser.findOne({ email });
  if (existing) return res.status(409).json({ success: false, message: 'Admin already exists' });
  const passwordHash = await bcrypt.hash(password, 10);
  const admin = await AdminUser.create({ email, passwordHash, name: name || 'Administrator' });
  res.status(201).json(ok({ _id: admin._id, email: admin.email, name: admin.name, role: admin.role }));
});


