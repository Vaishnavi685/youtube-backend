import asyncHandler  from "../utils/asyncHandler.js";

// method 
const registerUser = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: "ok"
    })
}) //  this'll run when some url hit for that we need route folder

export { registerUser }