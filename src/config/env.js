import 'dotenv/config';

export const env = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  storeName: process.env.STORE_NAME || 'CoderShop',
  maintenance: process.env.MAINTENANCE === 'true',
  workers: Number(process.env.CLUSTER_WORKERS) || 2
};