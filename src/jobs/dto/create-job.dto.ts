import { IsNotEmpty, MaxLength } from "class-validator";

export class CreateJobDto {
    @MaxLength(50)
    @IsNotEmpty()
    description: string;
}
