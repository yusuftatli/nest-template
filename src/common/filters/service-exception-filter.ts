import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { BaseException } from '../exceptions/base.exception';
import { v4 as uuidv4 } from 'uuid';

@Catch()
export class ServiceExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof BaseException) {
      const status = exception.status || HttpStatus.INTERNAL_SERVER_ERROR;
      if (!exception.params.traceId) {
        exception.params.traceId = uuidv4();
      }

      // TODO: add logging

      response.status(status).json(exception.params);
    } else {
      const status = (exception as any).statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
      let message = (exception as any).message || 'Bilinmeyen hata.';

      if ((exception as any).name === 'SequelizeDatabaseError') {
        message = 'Bilinmeyen hata.';
      }

      // TODO: add logging

      response.status(status).json({
        code: '99999',
        message,
        traceId: uuidv4(),
      });
    }
  }
}
