import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserCreateDto } from './dto/user-create.dto';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User) private userModel: typeof User
    ) { }

    async create(dto: UserCreateDto): Promise<UserDto | undefined> {
        const saveUser = new User();
        saveUser.nameSurname = dto.nameSurname;
        const createdUser = await saveUser.save();
        return UserDto.from(createdUser);
    }

    async findOne(email: string): Promise<User | undefined> {
        return this.userModel.findOne({ where: { email } });
    }


    async userExists(email: string): Promise<boolean | undefined> {
        return false;
    }

    async getByEmail(email: string) {
        if (!email) {
            return null;
        }

        const user = await this.userModel.findOne({
            where: {
                email: email.toLowerCase(),
            },
        });

        if (!user) return null;

        return UserDto.from(user);
    }
}