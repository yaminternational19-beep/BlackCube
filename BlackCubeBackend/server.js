import app from './app.js'  ;
import { env } from './src/config/env.js';
import { connectDB } from './src/config/db.js';
import path from 'path';


async function main() {

console.log('SERVER PID:', process.pid);
console.log('SERVER CWD:', process.cwd());
console.log('STATIC SERVING FROM:', path.resolve('uploads'));


  try {
    await connectDB(env.MONGODB_URI);
    app.listen(env.PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`API server listening on http://localhost:${env.PORT}`);
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

main();


