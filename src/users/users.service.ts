import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserCreateDto } from './dto/user-create.dto';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { encryptedPassword } from "../common/uilts/utils";
import { UserPasswordDto } from './dto/user-password.dto';
import * as bcrypt from 'bcrypt';
import { saveImage } from "../common/uilts/utils";
import { Job } from 'src/jobs/entities/job.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User) private userModel: typeof User
    ) { }

    async create(dto: UserCreateDto): Promise<UserDto | undefined> {
        const user = await this.getByEmail(dto.email);
        if (user) {
            throw new InternalServerErrorException({ error: "Email zaten kayıtlı" });
        }
        const saveUser = new User();

        saveUser.id = uuidv4();
        saveUser.password = await encryptedPassword(dto.password);
        saveUser.email = dto.email;
        saveUser.jobId = dto.jobId;
        saveUser.nameSurname = dto.nameSurname;
        saveUser.photo = await saveImage(dto.photo, saveUser.id);
        const createdUser = await saveUser.save();

        return UserDto.from(createdUser);
    }

    async loginByEmail(email: string): Promise<User | undefined> {
        const user = await this.userModel.findOne({ where: { email } });
        return user;
    }

    async findOne(id: string): Promise<UserDto | undefined> {
        const user = await this.userModel.findOne({
            include: [{ model: Job, as: 'job' }], where: { id }
        },);
        return UserDto.from(user);
    }

    async updateLasLogin(id: string): Promise<User | undefined> {
        const user = await this.userModel.findOne({ where: { id } });
        user.lastLoginAt = new Date();
        await user.save();
        return user;
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
    async changePasswordByEmail(email: string, dto: UserPasswordDto) {
        if (!dto) {
            return null;
        }
        const user = await this.userModel.findOne({
            where: {
                email: email.toLowerCase(),
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

    async forgetPassword(email: string) {
        const user = await this.userModel.findOne({ where: { email } },);

        const generatedCode = (Math.floor(100000 + Math.random() * 900000)).toString().substring(-2);
        user.password = await encryptedPassword(generatedCode);
        await user.save();

        return generatedCode;
    }
}
