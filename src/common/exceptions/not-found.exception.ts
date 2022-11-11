import { BaseException, ExceptionParams } from './base.exception';
import { HttpStatus } from '@nestjs/common';

export class NotFoundException extends BaseException {
  constructor(details: ExceptionParams) {
    super(details, HttpStatus.BAD_REQUEST);
  }
}
