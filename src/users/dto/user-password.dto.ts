import { IsNotEmpty, IsEmail, } from 'class-validator';

export class UserPasswordDto {
    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    newPassword: string;
}


