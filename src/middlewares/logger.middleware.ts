import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { LogsService } from '../logs/logs.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logsService: LogsService) {
  }

  use(req: Request, res: Response, next: () => void) {
    console.log('req.originalUrl',req.originalUrl)
    const logType = this.determineLogType(req.originalUrl);

    const logData = {
      ip: req.ip,
      dt: new Date(),
      type: logType,
    };

    this.logsService.create(logData)
      .then(() => next())
      .catch(err => {
        console.error('Error logging request:', err);
        next();
      });
  }

  private determineLogType(url: string): string {
    if (/\/github\/repos\/\w+\/\w+\/issues$/.test(url)) return 'get_issues';
    if (/\/github\/repos\/\w+\/\w+\/issue\/\d+$/.test(url)) return 'get_issue';
    if (/\/github\/search\/?$/.test(url)) return 'search_issues';
    return 'unknown';
  }
}
