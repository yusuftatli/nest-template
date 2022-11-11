import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';

const jwtFactory = {
  useFactory: async (configService: ConfigService) => ({
    secret: configService.get('TGS_JWT_SECRET'),
    signOptions: {
      expiresIn: configService.get('TGS_JWT_EXP'),
    },
  }),
  inject: [ConfigService],
};

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync(jwtFactory),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule { }