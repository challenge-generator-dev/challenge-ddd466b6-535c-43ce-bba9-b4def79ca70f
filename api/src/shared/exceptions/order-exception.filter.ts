import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

export class OrderExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(OrderExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let errorDetails: Record<string, unknown> = {};

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      
      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        const responseObj = exceptionResponse as Record<string, unknown>;
        message = (responseObj.message as string) || exception.message;
        errorDetails = responseObj;
      }
    } else if (exception instanceof Error) {
      message = exception.message;
      
      if (this.isKafkaRelatedError(exception)) {
        status = HttpStatus.SERVICE_UNAVAILABLE;
        message = 'Kafka service temporarily unavailable';
        errorDetails = {
          service: 'kafka',
          originalError: exception.message,
        };
      } else if (this.isValidationError(exception)) {
        status = HttpStatus.BAD_REQUEST;
        errorDetails = { validation: exception.message };
      }
    }

    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message,
      ...errorDetails,
    };

    this.logger.error(
      `${request.method} ${request.url} - Status: ${status} - Message: ${message}`,
      exception instanceof Error ? exception.stack : undefined,
    );

    response.status(status).json(errorResponse);
  }

  private isKafkaRelatedError(error: Error): boolean {
    const kafkaErrorPatterns = [
      'kafka',
      'broker',
      'consumer',
      'producer',
      'connection',
      'disconnected',
    ];
    const lowerMessage = error.message.toLowerCase();
    return kafkaErrorPatterns.some((pattern) => lowerMessage.includes(pattern));
  }

  private isValidationError(error: Error): boolean {
    const validationPatterns = ['validation', 'invalid', 'malformed'];
    const lowerMessage = error.message.toLowerCase();
    return validationPatterns.some((pattern) => lowerMessage.includes(pattern));
  }
}