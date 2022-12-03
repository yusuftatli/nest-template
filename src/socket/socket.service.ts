import { Injectable } from '@nestjs/common';

const Pusher = require('pusher');
const pusher = new Pusher({
  appId: '1512696',
  key: 'ea0b7f713606e8bb1931',
  secret: '911ee71e01a601aeb912',
  cluster: 'eu',
  useTLS: true,
});

@Injectable()
export class SocketsService {
  constructor() {}

  async send(value: string) {
    pusher.trigger('my-channel', 'my-event', {
      message: value,
    });
  }
}
