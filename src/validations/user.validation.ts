import * as Joi from '@hapi/joi';
import { Request, Response, NextFunction } from 'express';
import { RequestValidationError } from '../errors/validation-error';

const validatePostUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string()
      .regex(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)
      .required(),
    birthday: Joi.date().required(),
    password: Joi.string().required(),
  }).required();

  const isValid = schema.validate(req.body, { abortEarly: false });
  if (isValid.error)
    return next(new RequestValidationError(isValid.error.details));

  return next();
};

export { validatePostUser };
