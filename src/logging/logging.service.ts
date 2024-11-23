import {
  ConsoleLogger,
  Injectable,
  LoggerService,
  OnApplicationShutdown,
} from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LoggingService
  extends ConsoleLogger
  implements LoggerService, OnApplicationShutdown
{
  private readonly logFile: string;
  private readonly errorLogFile: string;
  private readonly logLevel: number;
  private readonly maxFileSize: number;

  constructor() {
    super();
    this.logFile = path.resolve(__dirname, '../../logs', 'app.log');
    this.errorLogFile = path.resolve(__dirname, '../../logs', 'error.log');
    this.logLevel = parseInt(process.env.LOG_LEVEL || '2', 10);
    this.maxFileSize = parseInt(process.env.LOG_FILE_MAX_SIZE || '1024', 10);

    const logDir = path.dirname(this.logFile);
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }

    process.on('uncaughtException', (error) => {
      this.error('Uncaught Exception', error.stack);
    });
    process.on('unhandledRejection', (reason) => {
      this.error('Unhandled Rejection', JSON.stringify(reason));
    });
  }

  log(message: string, ...optionalParams: any[]) {
    this.writeLog('log', message, optionalParams);
  }

  error(message: string, ...optionalParams: any[]) {
    this.writeLog('error', message, optionalParams);
  }

  warn(message: string, ...optionalParams: any[]) {
    this.writeLog('warn', message, optionalParams);
  }

  verbose(message: string, ...optionalParams: any[]) {
    this.writeLog('verbose', message, optionalParams);
  }

  private writeLog(level: string, message: string, optionalParams: any[]) {
    const levelPriority = this.getLevelPriority(level);
    if (levelPriority <= this.logLevel) {
      const logEntry = `${new Date().toISOString()} [${level.toUpperCase()}]: ${message} ${optionalParams
        .map((param) => JSON.stringify(param))
        .join(' ')}\n`;

      this.rotateFileIfNeeded(this.logFile);
      fs.appendFileSync(this.logFile, logEntry, 'utf8');
      console.log(`Log directory: ${path.dirname(this.logFile)}`);

      if (level === 'error') {
        this.rotateFileIfNeeded(this.errorLogFile);
        fs.appendFileSync(this.errorLogFile, logEntry, 'utf8');
        console.log(`Error log directory: ${path.dirname(this.errorLogFile)}`);
      }

      process.stdout.write(logEntry);
    }
  }

  private rotateFileIfNeeded(filePath: string) {
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      const fileSizeInKB = stats.size / 1024;
      if (fileSizeInKB > this.maxFileSize) {
        const rotatedFile = `${filePath}.${Date.now()}`;
        fs.renameSync(filePath, rotatedFile);
      }
    }
  }

  private getLevelPriority(level: string): number {
    const levels = { error: 0, warn: 1, log: 2, verbose: 3 };
    return levels[level] ?? 3;
  }

  onApplicationShutdown() {
    this.log('Application shutting down', 'log');
  }
}
