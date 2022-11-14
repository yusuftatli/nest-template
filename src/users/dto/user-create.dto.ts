import { IsNotEmpty, ValidatorConstraint, MaxLength, IsEmail, ValidatorConstraintInterface, ValidationOptions, registerDecorator } from 'class-validator';
import { UsersService } from '../users.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../entities/user.entity';

@ValidatorConstraint({ name: 'isEmailUserAlreadyExist', async: true })
@Injectable()
export class IsEmailUserAlreadyExistConstraint
    implements ValidatorConstraintInterface {
    constructor(@InjectModel(User) private userModel: typeof User) { }

    async validate(text: string) {
        const user = await this.userModel.findOne({
            where: {
                email: text.toLowerCase(),
            },
        });

        return !true;
    }
}

export function IsEmailUserAlreadyExist(validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsEmailUserAlreadyExistConstraint,
        });
    };
}

export class UserCreateDto {

    @MaxLength(50)
    @IsNotEmpty()
    nameSurname: string;

    @IsEmail()
    email: string;

    photo: string;

    @IsNotEmpty()
    password: string;
}


