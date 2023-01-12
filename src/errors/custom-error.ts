export abstract class CustomError extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract prepareErrors(): { message: string; attribute?: string | number }[]; // attribute in case of validation errors
}
