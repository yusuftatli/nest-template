import { Job } from "../entities/job.entity";

export class JobDto {
    id: string;
    description: string;

    static from(job: Job) {
        if (!job) return null;

        const jobDto = new JobDto();
        jobDto.id = job.id;
        jobDto.description = job.description;
        return jobDto
    }

    static fromList(job: Job[]) {
        if (!job) return null;
        return job.map((p) => JobDto.from(p));
    }
}
