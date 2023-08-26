
export const syncErrorHandler = (error, req, res, next) => {
  res.status(error.statusCode || 500).json({
    error: true,
    message: error.message,
    statusCode: error.statusCode,
    name: error.name,
    path: error.path,
  });
};

export const asyncErrorHandler = (func) => {
  return (req, res, next) => {
    func(req, res).catch((err) => next(err));
  };
};
