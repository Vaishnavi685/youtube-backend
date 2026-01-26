console.log("LOADED ApiError from:", import.meta.url)

class ApiError extends Error{
    constructor(
        statusCode,
        message= "something went wrong",
        errors = [],
        stack = ""
    ){
        super(message)
        this.statusCode = statusCode
        this.data = null,
        this.message = message,
        this.success = false;
        this.errors = errors
         
        console.log("ApiError constructor args:", statusCode, message)

        if(stack){
            this.stack = stack

        }else{
            Error.captureStackTrace(this, this.constructor)
        }

    }
}

export {ApiError}