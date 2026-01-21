import asyncHandler  from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { User} from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";
// method 
const registerUser = asyncHandler(async (req, res) => {
    
 //  this'll run when some url hit for that we need route folder

/*
Steps to register user ➖ [lec 13]
1]  get user details from frontend
2]  validation - not empty
3]  check if user already exist: username, email
4]  check for images. Check for avatar
5]  upload them to cloudinary, avatar
6]  create user object - create entry in db
7]  remove password and refresh token field from response
8]  check for user creation
9]  return res
*/
    const {fullname, username, email, password} = req.body
    console.log("email: ", email);

   /* if(fullname === ""){
        throw new ApiError(400, "fullname is required")
    }   OR */

    //validations
    if(
        [fullname, email, username, password].some((field) =>
        field?.trim() === "")
    ){
            throw new ApiError(400,"all fields are required")
    }
    
    const existedUser = User.findOne({
        $or: [{username},{email}]
    })

  //check if user already exist: username, email
    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists!")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLoacalPath = req.files?.coverImage[0]?.path; 

    if (!avatarLocalPath) {
        throw new ApiError(400," Avatar file is Required!")
    }

    const avatar = await uploadOnCloudinary( avatarLocalPath )
    const coverImage = await uploadOnCloudinary( coverImageLoacalPath )

    if (!avatar) {
        throw new ApiError(400," Avatar file is required ")
    }

    // create user object - create entry in db

    const user = await User.create({
        fullname,
        avatar: avatar.url, // url becoz we wanna store url of avatar
        coverImage: coverImage?.url || "", // coverImage is'nt required field so , ||
        email,
        password,
        username: username.toLowerCase()
    })
    // check if user is not empty of null

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    
    if (!createdUser) {
        throw new ApiError(500, "something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registed Successfully")
    )
}) 

export { registerUser, }