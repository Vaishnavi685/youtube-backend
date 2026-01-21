const asyncHandler = (requestHandler) =>{
    return (req, res, next) => {
        Promise.resolve(requestHandler(req,res, next)).
        catch((err) => next(err))
    }
}

/* can be done using promises

const asynHandler = (fn) => async (req, res, next) => {
    try{
        await fn(req, res, next)
    }catch(error){
        res.status(error.code || 500).json({
            sucess: false,
            message: error.message
        })
    }
}

*/
export default asyncHandler

// in this file all req ,res comes and we can handle throught the promises 