import { Module } from '@nestjs/common';
import { HealthCentersService } from './health-centers.service';
import { HealthCentersController } from './health-centers.controller';

@Module({
  providers: [HealthCentersService],
  controllers: [HealthCentersController]
})
export class HealthCentersModule {}
