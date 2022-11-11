import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
// import { UsersController } from './1users.controller';

@Module({
  imports: [SequelizeModule.forFeature([User]),],
  providers: [UsersService],
  exports: [UsersService],
  // controllers: [UsersController],
})
export class UsersModule { }