import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities/user.entity';

@Module({
  imports: [SequelizeModule.forFeature([User]),],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule { }