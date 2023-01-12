import { CustomError } from './custom-error';

interface ValidationError {
  message: string;
  path: (string | number)[];
}
export class RequestValidationError extends CustomError {
  statusCode = 400;

  constructor(public errors: ValidationError[]) {
    super('Invalid request parameters');

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  prepareErrors() {
    return this.errors.map((err) => {
      return { message: err.message, attribute: err.path[0] };
    });
  }
}
