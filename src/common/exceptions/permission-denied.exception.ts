import { BaseException, ExceptionParams } from './base.exception';
import { HttpStatus } from '@nestjs/common';

export class PermissionDeniedException extends BaseException {
  constructor(details: ExceptionParams) {
    super(details, HttpStatus.FORBIDDEN);
  }
}
