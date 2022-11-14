import { JobDto } from 'src/jobs/dto/job.dto';
import { User } from '../entities/user.entity';

export class UserDto {
    id: string;
    nameSurname: string;
    email: string;
    photo: string;
    job: JobDto;
    lastLoginAt: Date;
    createdBy: UserDto;
    createdAt: Date;

    static from(user: User) {
        if (!user) return null;

        const userDto = new UserDto();
        userDto.id = user.id;
        userDto.nameSurname = user.nameSurname;
        userDto.email = user.email;
        userDto.job = JobDto.from(user.job);
        userDto.photo = `${process.env.TGS_DOMAIN}/users/images/${user.photo}`;
        userDto.lastLoginAt = user.lastLoginAt;
        return userDto;
    }

    static fromList(user: User[]) {
        if (!user) return null;
        return user.map((p) => UserDto.from(p));
    }
}
