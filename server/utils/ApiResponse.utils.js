class ApiResponse {
   constructor(statusCode = 200 , message = "Success" , data = null ){
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.success = true;
   }
};

module.exports = { ApiResponse };