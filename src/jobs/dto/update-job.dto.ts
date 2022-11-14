import { PartialType } from '@nestjs/swagger';
import { CreateJobDto } from './create-job.dto';
import { IsNotEmpty } from "class-validator";

export class UpdateJobDto extends PartialType(CreateJobDto) {
}
