export const syncErrorHandler = (err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    error: true,
    message: err.message,
  });
};
export const asyncErrorHandler = (func) => {
  return (req, res, next) => {
    func(req, res, next).catch((err) => next(err));
  };
};
