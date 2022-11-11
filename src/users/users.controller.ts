import { Controller, Req, Body, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
// import { LocalAuthGuard } from '../auth/local-auth.guard';
import { UserCreateDto } from './dto/user-create.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }
    // @UseGuards(JwtAuthGuard)
    // @Get('profile/:userId')
    // getAll(@Param('userId') userId: string): string {
    //     return userId;
    // }

    // @UseGuards(LocalAuthGuard)
    @Post()
    async post(@Body() dto: UserCreateDto) {
        return this.usersService.create(dto);
    }
}
