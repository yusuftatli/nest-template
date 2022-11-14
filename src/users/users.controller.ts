import { Controller, Put, Body, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserCreateDto } from './dto/user-create.dto';
import { UserPasswordDto } from './dto/user-password.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    // @UseGuards(JwtAuthGuard)
    @Post("create")
    async post(@Body() dto: UserCreateDto) {
        return this.usersService.create(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Put('change-password')
    async changePassword(@Body() dto: UserPasswordDto) {
        return this.usersService.changePasswordByEmail(dto);
    }
}
