import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import readline from 'readline';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { AdminUser } from '../src/models/AdminUser.js';

function parseArg(name) {
  const arg = process.argv.find(a => a.startsWith(`--${name}=`));
  return arg ? arg.split('=').slice(1).join('=') : undefined;
}

async function prompt(query) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise<string>(resolve => rl.question(query, ans => { rl.close(); resolve(ans.trim()); }));
}

function upsertEnv(content, key, value) {
  const lines = content.split(/\r?\n/);
  let found = false;
  const next = lines.map((line) => {
    if (line.startsWith(`${key}=`)) {
      found = true;
      return `${key}=${value}`;
    }
    return line;
  });
  if (!found) next.push(`${key}=${value}`);
  return next.filter(l => l !== '').join('\n') + '\n';
}

async function main() {
  const root = process.cwd();
  const envPath = path.join(root, '.env');

  let email = parseArg('email');
  let password = parseArg('password');
  let jwtSecret = parseArg('secret');

  if (!email) email = await prompt('Admin email: ');
  if (!password) password = await prompt('Admin password: ');
  if (!jwtSecret) jwtSecret = crypto.randomBytes(32).toString('hex');

  let envContent = '';
  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf-8');
  }

  envContent = upsertEnv(envContent, 'ADMIN_EMAIL', email);
  envContent = upsertEnv(envContent, 'ADMIN_PASSWORD', password);
  envContent = upsertEnv(envContent, 'JWT_SECRET', jwtSecret);
  envContent = upsertEnv(envContent, 'JWT_EXPIRES_IN', '7d');

  fs.writeFileSync(envPath, envContent, 'utf-8');

  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/blackcube';
  await mongoose.connect(mongoUri);
  const existing = await AdminUser.findOne({ email });
  if (existing) {
    console.log('Admin already exists in DB, updating password...');
    existing.passwordHash = await bcrypt.hash(password, 10);
    await existing.save();
  } else {
    await AdminUser.create({ email, name: 'Administrator', passwordHash: await bcrypt.hash(password, 10) });
    console.log('Admin user created in DB.');
  }
  await mongoose.disconnect();

  console.log('Admin credentials and JWT secret have been written to .env');
  console.log('Restart the server to apply changes.');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});


