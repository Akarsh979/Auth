// Global error handler middleware for Express
// Should be placed after all routes in your app (e.g., app.use(errorHandler))

export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    // Optionally include stack trace in development
    ...(process.env.NODE_ENV === "development" && { stack: err.stack })
  });
};
