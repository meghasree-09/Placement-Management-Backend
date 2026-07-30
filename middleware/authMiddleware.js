import jwt from "jsonwebtoken";
//read authorization headers
export const auth=(req,res,next)=>{
    try{
    //headers sent by react will in req.headers
    const authHeader =req.headers.authorization;
    if(!authHeader){
        return res.status(401).json({
            success:false,
            message:"Access Denied"
        })
    }
    //extract the token
    const token = authHeader.split(" ")[1];

    //bearer:"ugfhrndbshfgyeujdbcvfhdjs"
    //verifying the jwt token
    const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
    );
    //verifies signature
    //expiry
    //secret key
    //store the user information
    req.user =decoded
    //next passes the control or the controller
    next()
    }catch(error){
        return res.status(401).json({
            success:false,
            message:"Invalid expired token"
        });
    }

}