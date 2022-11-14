import { IsNotEmpty, IsEmail, } from 'class-validator';

export class UserPasswordDto {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    newPassword: string;
}


