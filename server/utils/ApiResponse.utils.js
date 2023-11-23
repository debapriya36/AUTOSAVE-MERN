// This file contains the ApiResponse class which is used to send the response to the client

class ApiResponse {
   constructor(statusCode = 200 , message = "Success" , data = null ){
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.success = true;
   }
};

module.exports = { ApiResponse };