import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
export  const registerUser=async(req,res)=>{
    try{
        const { name, email, password, role } = req.body;
        
            //whole registration data comes from req.body

        const existingUser=await User.findOne({
            email
        });
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"user already exist"
            });
        }
        const hashedPassword=await bcrypt.hash(
            password,
            10
        );
        const user=await User.create({
            name,
            email,
            password,
            role
        });
        res.status(201).json({
            success:true,
            message:"User registered successfully",
            user
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
export default registerUser;

export const userLogin=async(req,res)=>{
    try{
        //all login data comes from req.body
        const{email,password}=req.body;
        const user=await User.findOne({email});
        if(!user){
            return res.status(404).json({
                success:false,
                message:"user not found"
            })
        }
        //now hashed password should be compared with original password
        //bcrypt.compare will securely compares the entered password and encrypted password
        const isMatch =await bcrypt.compare(
            password,
            user.password
        )
        //jwt generation 
        const token=jwt.sign({
            id:user._id,
            role:user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn:"1d"
        }
    )
    res.status(200).json({
        succes:true,
        message:"Login successful",
        token,
        user
    })



    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    };
    
}