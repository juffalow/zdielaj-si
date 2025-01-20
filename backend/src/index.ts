import http from 'http';
import { createTerminus } from '@godaddy/terminus';
import config from './config';
import logger from './logger';
import services from './services';

async function onSignal(): Promise<void> {
  logger.warn('Server is going to shut down! Starting cleanup...');
}

async function onShutdown (): Promise<void> {
  logger.warn('Server is shutting down!');
}

async function onHealthCheck(): Promise<void> {
  return;
}

async function start(): Promise<void> {
  try {
    const namespace = config.services.trace.daemonAddressNamespace;
    const name = config.services.trace.daemonAddressName;
    if (typeof namespace === 'string' && typeof name === 'string') {
      const address = await services.ServiceDiscovery.discoverInstance(namespace, name);
  
      (services.Trace as any).setDaemonAddress(address);
    }

    services.Trace.captureHTTPRequests();

    const app = (await import('./app')).default;
    
    const server = http.createServer(app);

    createTerminus(server, {
      healthChecks: {
        '/health/liveness': onHealthCheck,
      },
      onSignal,
      onShutdown,
    });
    
    server.listen(config.port, () => {
      logger.info(`Server started at http://localhost:${ config.port }`);
    });
  } catch(err) {
    logger.error('Unable to start server!', { error: { message: err.message, stack: err.stack } })
    process.exit(1);
  }
}

start();
