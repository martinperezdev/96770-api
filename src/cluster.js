import cluster from 'cluster';
import os from 'os';
import { env } from './config/env.js';
import { logger } from './utils/logger.js';

const cpuCount = os.cpus().length;
const workersCount = Math.min(env.workers, cpuCount);

if(cluster.isPrimary){

  logger.info({ msg: 'Primary process started', primaryPid: process.pid, cpuCount, workersCount });

  //creamos los workers
  for(let i= 0; i < workersCount; i++){
    cluster.fork();
  };

}else{
  //si no es el proceso principal entonces el que entra aca es un workers
  //cada worker importa server.js y levanta nuestra api
  await import('./server.js');
}