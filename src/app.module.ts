import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { utilities as nestWinstonModuleUtilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import * as crypto from "crypto";
import 'winston-daily-rotate-file';
import * as fs from "fs";
import { join } from "path";
import { SequelizeModule, SequelizeModuleOptions } from "@nestjs/sequelize";
import { ConfigService } from '@nestjs/config';
import { JobsModule } from './jobs/jobs.module';

const getSequelizeOptions = (
  configService: ConfigService
): SequelizeModuleOptions => {
  const localPassword = configService.get<string>("TGS_DB_PASSWORD_LOCAL");

  const options: SequelizeModuleOptions = {
    dialect: "mariadb",
    host: configService.get<string>("TGS_DB_HOST"),
    port: +configService.get<string>("TGS_DB_PORT"),
    username: configService.get<string>("TGS_DB_USERNAME"),
    password: localPassword || getDatabasePassword(configService),
    database: configService.get<string>("TGS_DB_DATABASE"),
    ssl: configService.get<boolean>("TGS_DB_SSL"),
    autoLoadModels: true,
    synchronize: true,
    sync: {
      force: false,
      alter: {
        drop: false,
      },
    },
  };
  return options;
};

const getDatabasePassword = (configService: ConfigService): string => {
  const IV = configService.get<string>("TGS_DB_VECTOR");
  const homePath = configService.get<string>("TGS_HOME");
  const keyFile = homePath + "/config/key.txt";
  const key = fs.readFileSync(keyFile).toString();
  const decipher = crypto.createDecipheriv("aes-256-cbc", key, IV);
  const encryptedPassword = configService.get<string>("TGS_DB_PASSWORD");

  let password: string;
  password = decipher.update(encryptedPassword, "base64", "utf-8");
  if (!password) {
    decipher.update(encryptedPassword, "base64", "utf-8");
    password = decipher.final("utf-8");
  }

  return password;
};

@Module({
  imports: [AuthModule, UsersModule, ConfigModule.forRoot({
    envFilePath: ['.env.local', '.env'],
    isGlobal: true,
  }), SequelizeModule.forRootAsync({
    useFactory: (configService: ConfigService) =>
      getSequelizeOptions(configService),
    inject: [ConfigService],
  }), UsersModule, JobsModule],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
