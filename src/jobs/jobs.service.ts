import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Job } from './entities/job.entity';
import { v4 as uuidv4 } from 'uuid';
import { JobDto } from './dto/job.dto';

@Injectable()
export class JobsService {
  constructor(
    @InjectModel(Job) private jobModel: typeof Job
  ) { }

  async create(dto: CreateJobDto): Promise<JobDto | undefined> {
    const job = new Job();
    job.id = uuidv4();
    job.description = dto.description;
    const createdJob = await job.save();
    return JobDto.from(createdJob);
  }

  async update(id: string, dto: UpdateJobDto): Promise<JobDto | undefined> {
    const job = await this.jobModel.findByPk(id);
    job.description = dto.description;
    const updateJob = await job.save();
    return JobDto.from(updateJob);
  }

  async findAll(): Promise<JobDto[] | undefined> {
    const jobs = await this.jobModel.findAll();
    return JobDto.fromList(jobs);
  }

  async findOne(id: string): Promise<JobDto | undefined> {
    const job = await this.jobModel.findByPk(id);
    return JobDto.from(job);
  }

  async remove(id: string) {
    await this.jobModel.destroy({ where: { id } });
  }
}
