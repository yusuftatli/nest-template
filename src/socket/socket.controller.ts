import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { SocketsService } from './socket.service';

@Controller('sockets')
export class SocketsController {
  constructor(private readonly socketsService: SocketsService) {}

  @Get(':value')
  findOne(@Param('value') value: string) {
    return this.socketsService.send(value);
  }
}
