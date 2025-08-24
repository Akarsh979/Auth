import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import User from "../models/user.model.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler( async (req,res) => {
   const {username,email,password} = req.body;

   if([username,email,password].some((field)=>field?.trim() === "")) {
      throw new ApiError(400,"All fields are required");
   }

   const existingUser = await User.findOne({
      $or: [{ username },{ email }]
   })

   if(existingUser){
      throw new ApiError(409,"User with email or username already exists");
   }

   const user = await User.create({
      email,
      password,
      username: username.toLowerCase()
   });

   if(!user){
      throw new ApiError(500,"Something went wrong while registering the user");
   }

   const createdUser = {
      _id: user._id,
      email: user.email,
      username: user.username
   }

   return res.status(201).json(new ApiResponse(201,createdUser,"User registered succesfully"));

});

export {registerUser};