import * as Joi from '@hapi/joi';
import { Request, Response, NextFunction } from 'express';
import { RequestValidationError } from '../errors/validation-error';

const validatePostUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema: Joi.ObjectSchema = Joi.object({
    Name: Joi.string().required(),
    LastName: Joi.string().required(),
    Email: Joi.string()
      .regex(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)
      .required(),
    Birthday: Joi.date().required(),
    Password: Joi.string().required(),
  }).required();

  const isValid: Joi.ValidationResult = schema.validate(req.body, {
    abortEarly: false,
  });
  if (isValid.error)
    return next(new RequestValidationError(isValid.error.details));

  return next();
};

export { validatePostUser };
