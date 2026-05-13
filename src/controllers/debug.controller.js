import { successResponse } from "../utils/apiResponse.js";

export function getProcessInfo(req, res) {
  return successResponse(res, {
    message: 'Process info',
    payload: {
      pid: process.pid,
      nodeVersion: process.version,
      platform: process.platform,
      uptime: process.uptime()
    }
  });
}

//funcion para simular una tarea pesada
export function blockCpu(req, res) {
  const duration = Number(req.query.duration) || 3000;
  const start = Date.now();

  while( Date.now() - start < duration ) {
    //tarea bloqueante
  }

  return successResponse(res, {
    message: 'Task completed',
    payload: {
      pid: process.pid,
      durationMs: Date.now() - start
    }
  });
}