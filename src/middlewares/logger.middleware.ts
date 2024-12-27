import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { LogsService } from '../logs/logs.service';
import { Reflector } from '@nestjs/core';
import { LOG_TYPE_KEY } from '../decorators/log-type.decorator';
import { Log } from '../logs/schemas/log.schema';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    private readonly logsService: LogsService,
    private readonly reflector: Reflector,
  ) {}

  use(req: Request, res: Response, next: () => void) {
    res.on('finish', () => {
      const routeHandler = req.route?.stack?.[0]?.handle || null;

      if (!routeHandler) {
        return;
      }

      const logType = this.reflector.get<string>(LOG_TYPE_KEY, routeHandler) || 'unknown';

      const logData: Log = {
        ip: req.ip,
        dt: new Date().toISOString(),
        type: logType,
      };

      this.logsService
        .create(logData)
        .catch((err) => {
          console.error('Error logging request:', err);
        });
    });

    next();
  }
}
