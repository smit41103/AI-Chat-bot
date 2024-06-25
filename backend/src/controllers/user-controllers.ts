import { NextFunction,Request,Response } from "express";
import User from "../models/User.js";
import {hash,compare} from 'bcrypt';
import { createToken } from "../utils/token-manager.js";
import path from "path";
import { COOKIE_NAME } from "../utils/constants.js";


export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //get all users
  try {
    const users = await User.find();
    return res.status(200).json({message:"OK",users});
  } catch (error) {
    console.log(error);
    return res.status(200).json({message:"Error",cause:error.message});
  }
};


//signup
export const userSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //user signup
    const {name,email,password} = req.body;
    const existingUser = await User.findOne({email});
    if(existingUser){
      return res.status(409).json({message:"User already exists"});
    }
    const hashedPassword = await hash(password,10);
    const user =new User({name,email,password:hashedPassword});
    await user.save();

    //cookie
    res.clearCookie(COOKIE_NAME,{
      httpOnly:true,
      domain:"localhost",
      signed:true,
      path:"/",
    });

    //generate token
    const token =createToken(user._id.toString(),user.email,"7d");
    
    //storing the token as a cookie
    const expires = new Date();
    console.log(expires);
    expires.setDate(expires.getDate()+7);
    res.cookie(COOKIE_NAME,token,{
      path:"/",
      domain:"localhost",
      expires,
      httpOnly:true,
      signed:true,
    });


    return res.status(201).json({message:"User created successfully",id:user.id.toString()});
  } catch (error) {
    console.log(error);
    return res.status(404).json({message:"Error",cause:error.message});
  }
};


//login
export const userLogin = async(req,res,next)=>{
  try {
    const{email,password}=req.body;
    const user = await User.findOne({email});
    //check if user exists or not
    if(!user){
      return res.status(404).json({message:"User not found"});
    }
    //check password is correct or not
    const ispasswordCorrect = await compare(password,user.password);
    if(!ispasswordCorrect){
      return res.status(401).json({message:"Invalid Password"});
    }
    //clear cookies
    res.clearCookie(COOKIE_NAME,{
      httpOnly:true,
      domain:"localhost",
      signed:true,
      path:"/",
    });

    //generate token
    const token =createToken(user._id.toString(),user.email,"7d");
    
    //storing the token as a cookie
    const expires = new Date();
    console.log(expires);
    expires.setDate(expires.getDate()+7);
    res.cookie(COOKIE_NAME,token,{
      path:"/",
      domain:"localhost",
      expires,
      httpOnly:true,
      signed:true,
    });




    return res.status(200).json({message:"User logged in successfully",id:user.id.toString()});

  } catch (error) {
    console.log(error);
    return res.status(404).json({message:"Error",cause:error.message});
  }

};