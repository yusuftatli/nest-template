import { Module } from '@nestjs/common';
import { SocketsController } from './socket.controller';
import { SocketsService } from './socket.service';

@Module({
  controllers: [SocketsController],
  providers: [SocketsService],
})
export class SocketsModule {}
