/**
 * ApiError
 * A standardized error class. Controllers throw `new ApiError(404, "Not found")`
 * instead of raw Error objects, so errorMiddleware always knows the correct
 * HTTP status code to send back.
 */
class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.success = false;
  }
}

export default ApiError;
