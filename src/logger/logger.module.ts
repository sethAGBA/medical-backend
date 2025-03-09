import { Module } from '@nestjs/common';
import { Logger } from './logger.service';

@Module({
  providers: [Logger], // Fournir Logger
  exports: [Logger], // Exporter Logger pour qu'il soit disponible dans d'autres modules
})
export class LoggerModule {}