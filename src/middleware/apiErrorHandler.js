export const syncErrorHandler = (err, req, res, next) => {
    res.status(err.statusCode).json({
        error: true,
        message: err.message
    })
}
export const asyncErrorHandler = (func) => {
    return (req, res, next) => {
        func(req, res).catch(err  => next(err))
    }
}