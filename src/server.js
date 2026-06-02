import app from './app.js';
import { env } from "./config/env.js";
import { logger } from './utils/logger.js';
import { connectDB } from './config/db.js';
import { seedUsers } from './seeds/users.seed.js';
import { seedProducts } from './seeds/products.seed.js';

const PORT = env.port;

async function main() {
  await connectDB();

  if (env.seedDb && env.nodeEnv === 'development') {
    await seedUsers();
    await seedProducts();
  }

  app.listen(PORT, () => {
    logger.info({
      msg: 'Server is running',
      port: PORT,
      environment: env.nodeEnv
    });
  });
}

main();