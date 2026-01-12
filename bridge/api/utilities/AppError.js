// imports

class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
        this.isOperational = true; // distinguishes bug errors from user errors

        Error.captureStackTrace(this, this.constructor);
    }
}

// exports
export default AppError;
