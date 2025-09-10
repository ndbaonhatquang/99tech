export class HttpError extends Error {
  status: number;
  code?: string;

  constructor(status: number, message: string, code?: string) {
    super(message);
    this.status = status;
    if (code !== undefined) {
      this.code = code;
    }
  }
}

export class BadRequestError extends HttpError {
  constructor(message = "Bad Request", code?: string) {
    super(400, message, code);
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message = "Unauthorized", code?: string) {
    super(401, message, code);
  }
}

export class ForbiddenError extends HttpError {
  constructor(message = "Forbidden", code?: string) {
    super(403, message, code);
  }
}

export class NotFoundError extends HttpError {
  constructor(message = "Not Found", code?: string) {
    super(404, message, code);
  }
}

export class ConflictError extends HttpError {
  constructor(message = "Conflict", code?: string) {
    super(409, message, code);
  }
}
