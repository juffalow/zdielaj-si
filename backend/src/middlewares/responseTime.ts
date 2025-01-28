import type { Request, Response, NextFunction } from 'express';
import config from '../config';
import logger from '../logger';

export default function logResponseTime(req: Request, res: Response, next: NextFunction): void {
  if (config.logger.level === 'debug') {
    const startHrTime = process.hrtime();

    res.on('finish', () => {
      const elapsedHrTime = process.hrtime(startHrTime);
      const elapsedTimeInMs = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6;
      logger.debug(`Response time for ${req.baseUrl}${req.path}: ${elapsedTimeInMs}ms`, { responseTime: elapsedTimeInMs });
    });
  }

  next();
}
