import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { AdminUser } from '../models/AdminUser.js';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@example.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export const login = async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' });
  }

  // Try DB admin first
  const admin = await AdminUser.findOne({ email });
  if (admin) {
    const okPassword = await bcrypt.compare(password, admin.passwordHash);
    if (!okPassword) return res.status(401).json({ success: false, message: 'Invalid credentials' });
    const token = jwt.sign({ sub: String(admin._id), email: admin.email, role: 'admin' }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    return res.json({ success: true, data: { token } });
  }

  // Fallback to ENV credentials
  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
  const token = jwt.sign({ sub: 'admin-env', email, role: 'admin' }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  return res.json({ success: true, data: { token } });
};


