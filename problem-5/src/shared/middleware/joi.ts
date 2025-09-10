import type { Request, Response, NextFunction } from "express";
import type Joi from "joi";
import { HttpError } from "../../utils/http-error.ts";

type Schemas = {
  body?: Joi.ObjectSchema;
  query?: Joi.ObjectSchema;
  params?: Joi.ObjectSchema;
};

export function validateRequest(schemas: Schemas) {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      if (schemas.params) {
        const { value, error } = schemas.params.validate(req.params);
        if (error) return next(new HttpError(400, "Validation Error"));
        req.params = value as any;
      }
      if (schemas.query) {
        const { value, error } = schemas.query.validate(req.query);
        if (error) return next(new HttpError(400, "Validation Error"));
        req.query = value as any;
      }
      if (schemas.body) {
        const { value, error } = schemas.body.validate(req.body);
        if (error) return next(new HttpError(400, "Validation Error"));
        req.body = value as any;
      }
      return next();
    } catch (e) {
      return next(new HttpError(400, "Validation Error"));
    }
  };
}
