import { IsNotEmpty, ValidatorConstraint, MaxLength, IsEmail, ValidatorConstraintInterface, ValidationOptions, registerDecorator } from 'class-validator';
import { UsersService } from '../users.service';
import { Injectable } from '@nestjs/common';

export class UserCreateDto {

    @MaxLength(50)
    @IsNotEmpty()
    nameSurname: string;

    @IsEmail()
    @IsEmailUserAlreadyExist({
        message: 'geçersiz email girdiniz.',
    })
    email: string;

    photo: string;
}


@ValidatorConstraint({ name: 'isEmailUserAlreadyExist', async: true })
@Injectable()
export class IsEmailUserAlreadyExistConstraint
    implements ValidatorConstraintInterface {
    constructor(protected readonly usersService: UsersService) { }

    async validate(text: string) {
        return !(await this.usersService.userExists(text));
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