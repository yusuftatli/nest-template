import { BaseException, ExceptionParams } from './base.exception';
import { HttpStatus } from '@nestjs/common';

export class InvalidParameterException extends BaseException {
  constructor(details: ExceptionParams) {
    super(details, HttpStatus.BAD_REQUEST);
  }
}
