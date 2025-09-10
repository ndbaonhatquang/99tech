import type { NextFunction, Request, Response } from "express";
import type { ZodSchema } from "zod";
import { HttpError } from "../../utils/http-error.ts";

type Parts = "body" | "query" | "params";

export function validate(schema: ZodSchema, part: Parts = "body") {
  return (req: Request, res: Response, next: NextFunction) => {
    const target =
      part === "body" ? req.body : part === "query" ? req.query : req.params;
    const result = schema.safeParse(target);
    if (!result.success) {
      return next(new HttpError(400, "Validation Error"));
    }
    // assign parsed values to ensure correct types downstream
    if (part === "body") req.body = result.data;
    if (part === "query") req.query = result.data as any;
    if (part === "params") req.params = result.data as any;
    return next();
  };
}

export function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  // basic centralized error handler
  const status = err?.status || 500;
  const message = err?.message || "Internal Server Error";
  const code = err?.code;
  return res.status(status).json({ error: message, code });
}

export function validateIdParam(paramName: string = "id") {
  return (req: Request, res: Response, next: NextFunction) => {
    const raw = (req.params as any)[paramName];
    const id = Number(raw);
    if (!Number.isInteger(id) || id <= 0)
      return next(new HttpError(400, "Invalid id"));
    (res.locals as any).id = id;
    return next();
  };
}
