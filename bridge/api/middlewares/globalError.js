// imports

// global error middleware
// eslint-disable-next-line no-unused-vars
export default (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    // development
    if (process.env.NODE_ENV === "development") {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
            stack: err.stack,
            error: err,
        });
    } else {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message || "something went wrong!",
        });
    }
};
