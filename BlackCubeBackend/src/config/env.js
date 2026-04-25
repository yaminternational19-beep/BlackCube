import dotenv from 'dotenv';

dotenv.config();
console.log("process.env.MONGODB_URI",process.env.MONGODB_URI)
export const env = {
  PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 4000,
  MONGODB_URI: process.env.MONGODB_URI || null,
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000',
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || 'admin@example.com',
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || 'admin123'
};

