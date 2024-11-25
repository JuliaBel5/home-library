import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { readFile } from 'fs/promises';
import { resolve } from 'path';
import { cwd } from 'process';
import { parse } from 'yaml';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { LoggingService } from './logging/logging.service';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

dotenv.config({ path: resolve(cwd(), '.env') });

async function bootstrap() {
  const port = process.env.PORT || 4000;
  const app = await NestFactory.create(AppModule);
  const loggingService = app.get(LoggingService);

  app.useLogger(new LoggingService());

  app.useGlobalGuards(app.get(JwtAuthGuard));
  app.useGlobalFilters(new HttpExceptionFilter(loggingService));

  const document = await readFile(resolve(cwd(), 'doc', 'api.yaml'), {
    encoding: 'utf8',
  });
  SwaggerModule.setup('doc', app, parse(document));

  await app.listen(port);
  loggingService.log(`App listening on port ${port}`);
}
bootstrap();
