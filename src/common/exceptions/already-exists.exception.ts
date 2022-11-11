import { BaseException, ExceptionParams } from './base.exception';
import { HttpStatus } from '@nestjs/common';

export class AlreadyExistsException extends BaseException {
  constructor(details: ExceptionParams) {
    super(details, HttpStatus.BAD_REQUEST);
  }
}
