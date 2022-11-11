import { HttpStatus } from '@nestjs/common';

export class BaseException {
  constructor(public readonly params: ExceptionParams, public readonly status: HttpStatus) { }
}

export interface ExceptionField {
  name: string;
  message?: string;
}

export interface ExceptionParams {
  /**
   * Human readable error message. Can be shown to user.
   */
  message: string;
  /**
   * (Optional) Unique exception ID. Can be used for exception investigation or log parsing.
   *
   * Will be generated just before sending response if not present.
   *
   */
  traceId?: string;
  /**
   * Optional field messages, can be used when one or more field requirement fails.
   */
  fields?: ExceptionField[];

  code?: string;

  errors?: any;
}
