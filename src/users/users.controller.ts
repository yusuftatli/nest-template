import { Controller, Put, Param, Res, Get, Body, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserCreateDto } from './dto/user-create.dto';
import { UserPasswordDto } from './dto/user-password.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    async post(@Body() dto: UserCreateDto) {
        return this.usersService.create(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Put('/change-password/:email')
    async changePassword(@Param('email') email: string, @Body() dto: UserPasswordDto) {
        return this.usersService.changePasswordByEmail(email, dto);
    }

    @Put('/forget-password/:email')
    async forgetPassword(@Param('email') email: string) {
        return this.usersService.forgetPassword(email);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get("/images/:filename")
    async getFile(@Param("filename") filename: string, @Res() res: any) {
        res.sendFile(filename, { root: process.env.STATIC_PATH });
    }
}
