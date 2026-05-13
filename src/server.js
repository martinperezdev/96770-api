import app from './app.js';
import { env } from "./config/env.js";
import { logger } from './utils/logger.js';

const PORT = env.port;

app.listen(PORT, () => {
  logger.info("Server is running");
  console.log(`Server is running on port ${PORT}`);
  console.log(`Current environment: ${env.nodeEnv}`);
  console.log(`Active store: ${env.storeName}`);
});