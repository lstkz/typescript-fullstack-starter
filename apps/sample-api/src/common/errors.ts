export class HttpError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
  }
}
export class NotFoundError extends HttpError {
  constructor(message: string) {
    super(404, message);
  }
}
export class BadRequestError extends HttpError {
  constructor(message: string) {
    super(40, message);
  }
}
