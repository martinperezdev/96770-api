import mongoose from 'mongoose';

import { env } from './env.js';
import { logger } from '../utils/logger.js';

export async function connectDB() {
  try {
    await mongoose.connect(env.mongoUri);

    logger.info({ msg: 'MongoDB connected' });
  } catch (error) {
    logger.error({
      msg: 'MongoDB connection error',
      error: error.message,
    });

    process.exit(1);
  }
}