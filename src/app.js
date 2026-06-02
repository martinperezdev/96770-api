import express from 'express';
import healthRouter from './routes/health.router.js';
import productsRouter from './routes/products.router.js';
import { env } from './config/env.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { requestLogger } from './middlewares/requestLogger.js';
import { cacheControl } from './middlewares/cacheControl.js';
import compression from 'compression';
import { requestId } from './middlewares/requestId.js';
import metricsRouter from './routes/metrics.router.js';
import debugRouter from './routes/debug.router.js';
import docsRouter from './routes/docs.router.js';
import authRouter from './routes/auth.router.js';

const app = express();

//Bloque 1 - middleware de config
app.use(compression());
app.use(express.json());
app.use(requestId);
app.use(requestLogger);
app.use(cacheControl);

//Bloque 2 - middleware para estado de mantenimiento
app.use((req, res, next)=> {
  if(env.maintenance) return res.status(503).json({ status: "maintenance" });

  next();
});

//Bloque 3 - endpoints
app.use('/api/health', healthRouter);
app.use('/api/products', productsRouter);
app.use('/api/auth', authRouter);
app.use('/api/metrics', metricsRouter);

if(!env.isProd){
  app.use('/api/debug', debugRouter);
  app.use('/api/docs', docsRouter);
};

//Bloque 4 - middleware para errores
app.use(errorHandler)

// Test unitario -> prueba una funcion aislada -> successResponse
// Test de integracion -> prueba varias partes juntas -> 1 - middlewares + controllers
                                                      //2 - ruta + controller + response helpers
// Test de enpoint -> prueba una ruta completa -> ej: GET /api/products
// Test de performance -> 

export default app;