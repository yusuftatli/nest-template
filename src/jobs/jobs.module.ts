import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Job } from './entities/job.entity';

@Module({
  imports: [SequelizeModule.forFeature([Job]),],
  controllers: [JobsController],
  providers: [JobsService]
})
export class JobsModule { }
