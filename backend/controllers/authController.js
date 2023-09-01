import bcrypt from "bcrypt";
import  Jwt  from "jsonwebtoken";
import User from "../models/userModel.js";
import dotenv from 'dotenv';
dotenv.config();

export const register=async(req,res)=>
{
    try {
        const {fName,lName,email,password,locaiton,occupation,impressions,viewedProfile}=req.body;
        // res.status(500).json({fName,lName,email,picturePath,password,locaiton,occupation})
        const salt=await bcrypt.genSalt();
        const bPassword=await bcrypt.hash(password, salt);
        const picturePath=req.file.path;

        const newUser=new User({
            fName,
            lName,
            email,
            password:bPassword,
            picturePath,
            locaiton,
            occupation,
            impressions,
            viewedProfile
        })
       const saved=await newUser.save();
       res.status(200).json(saved) 

    } catch (error) {
        res.status(400).json(`error is : ${error}`);
    }
}
export const login=async(req,res)=>
{
   try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist. " });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

    const token = Jwt.sign({ id: user._id }, process.env.jwt_secret);
    delete user.password;
    res.status(200).json({ token, user });
   } catch (error) {
        res.status()
   } 
}

