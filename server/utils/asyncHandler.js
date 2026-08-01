/**
 * asyncHandler
 * Wraps an async Express route handler so any thrown error or rejected
 * promise is automatically passed to next(), which triggers errorMiddleware.
 * This avoids writing try/catch in every single controller function.
 *
 * Usage:
 *   router.post("/login", asyncHandler(loginUser));
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;
