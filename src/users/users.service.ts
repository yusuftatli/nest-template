import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserCreateDto } from './dto/user-create.dto';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { encryptedPassword } from "../common/uilts/utils";
import { UserPasswordDto } from './dto/user-password.dto';
import * as bcrypt from 'bcrypt';
import { saveImage } from "../common/uilts/utils";

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User) private userModel: typeof User
    ) { }

    async create(dto: UserCreateDto): Promise<UserDto | undefined> {
        const saveUser = new User();
        saveUser.id = uuidv4();

        saveUser.password = await encryptedPassword(dto.password);
        saveUser.email = dto.email;
        saveUser.nameSurname = dto.nameSurname;
        saveUser.photo = await saveImage(dto.photo, saveUser.id);
        const createdUser = await saveUser.save();

        return UserDto.from(createdUser);
    }

    async findOne(email: string): Promise<User | undefined> {
        return this.userModel.findOne({ where: { email } });
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
    async changePasswordByEmail(dto: UserPasswordDto) {
        if (!dto) {
            return null;
        }
        const user = await this.userModel.findOne({
            where: {
                email: dto.email.toLowerCase(),
            },
        });

        if (!user) return null;

        const validPassword = await bcrypt.compare(dto.password, user.password);

        if (validPassword) {
            user.password = await encryptedPassword(dto.newPassword);
            await user.save();
        }
        return UserDto.from(user);
    }
}
