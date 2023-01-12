import { CustomError } from './custom-error';

export class NotFoundError extends CustomError {
  statusCode: number = 404;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  prepareErrors(): { message: string; attribute?: string | undefined }[] {
    return [
      {
        message: this.message,
      },
    ];
  }
}
