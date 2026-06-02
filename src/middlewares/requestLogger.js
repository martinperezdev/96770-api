import { logger } from "../utils/logger.js";
import { requestCounter, requestDuration } from "../utils/metrics.js";

export function getLogLevel(statusCode) {
  if (statusCode >= 500) return 'error';
  if (statusCode >= 400) return 'warn';
  return 'info';
};

export function requestLogger(req, res, next) {
  //1 - Registrar el tiempo cuando entro la peticion
  const start = Date.now();

  //2 - Escuchamos el evento "finish" que dispara una funcion cuando la respuesta ya se envio al cliente
  res.on("finish", () => {
    //cada vez que finaliza una request, nuestro contador de request aumenta +1(teniendo en cuenta metodo y codigo de estado)
    requestCounter.labels(req.method, res.statusCode).inc();

    //3 - Calculamos cuanto tiempo paso desde que llego la peticion hasta que se respondio
    const responseTimeMs = Date.now() - start;

    //registramos la latencia en segundos
    requestDuration.observe(responseTimeMs / 1000);

    const logLevel = getLogLevel(res.statusCode);

    logger[logLevel]({
      msg: 'HTTP Request',
      reqId: req.reqId,
      method: req.method,
      path: req.originalUrl,
      statusCode: res.statusCode,
      responseTimeMs
    });
  });

  //llamamos a next para que la peticion siga su curso
  next();
};