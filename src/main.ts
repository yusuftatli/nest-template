import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieSession from 'cookie-session';
import * as passport from 'passport';
import { ValidationError, ValidatorOptions } from 'class-validator';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ServiceExceptionFilter } from './common/filters/service-exception-filter';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import express from 'express';

export interface ValidationPipeOptions extends ValidatorOptions {
  transform?: boolean;
  disableErrorMessages?: boolean;
  exceptionFactory?: (errors: ValidationError[]) => any;
}

const initSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Tingoss API')
    .setDescription('Tingoss API documentation')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    cookieSession({
      name: 'session',
      keys: ['key1'],

      // Cookie Options
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    }),
  );

  app.useGlobalPipes(new ValidationPipe());
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((obj, done) => done(null, obj));

  initSwagger(app);
  await app.listen(process.env.TGS_PORT || 8080);
}
bootstrap();
