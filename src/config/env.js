import 'dotenv/config';

export const env = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  storeName: process.env.STORE_NAME || 'CoderShop',
  maintenance: process.env.MAINTENANCE === 'true',
  workers: Number(process.env.CLUSTER_WORKERS) || 2,
  isProd: process.env.NODE_ENV === 'production',
  mongoUri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/backend3-ecommerce',
  mongoUriTest: process.env.MONGO_URI_TEST || 'mongodb://127.0.0.1:27017/backend3-ecommerce-test',
  seedDb: process.env.SEED_DB === 'true',
  jwtSecret: process.env.JWT_SECRET || 'dev-secret',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1h',
};