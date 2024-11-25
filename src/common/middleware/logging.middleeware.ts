import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggingService } from 'src/logging/logging.service';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(private readonly loggingService: LoggingService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { method, url, query, body } = req;

    res.on('finish', () => {
      const { statusCode } = res;
      this.loggingService.log(
        `Request: ${method} ${url} - Query: ${JSON.stringify(
          query,
        )} - Body: ${JSON.stringify(body)} - Status: ${statusCode}`,
      );
    });

    next();
  }
}
