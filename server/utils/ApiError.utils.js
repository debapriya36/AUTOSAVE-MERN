// ApiError class for handling errors 
class ApiError extends Error {
    constructor(statusCode = 500, message = "Something Went Wrong") {
        super();
        this.statusCode = statusCode;
        this.message = message;
        this.success = false;
    }
}

module.exports = { ApiError };
