import { NestMiddleware } from '@nestjs/common';

export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    console.log(`LoggerMiddleware -- ${req.method} ${req.url}`);
    next();
  }
}
