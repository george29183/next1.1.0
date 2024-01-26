import { connect } from "@/dbconfig/dbconfig"; 
import User from "@/models/usermodel";
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import Jwt  from "jsonwebtoken";
connect()

export async function POST(request){
    try {
        const reqBody = await request.json()
        const {email, password} = reqBody
        console.log(reqBody);
         
        //check if user exists
         const user = await User.findOne({email})
         !user?NextResponse.json({error:"user does not exist"}, {status:400}):null

        //check if password is correct
          const validPassword = await bcryptjs.compare(password,user.password)
          !validPassword?NextResponse.json({error:"invalid password"}, {status:400}):null

        //create token data 
         const tokenData = {
          id:user._id,
          username:user.username,
          email:user.email
         }
        
         //create token
          const token = await Jwt.sign(tokenData,process.env.TOKEN_SECRET,{expiresIn:"1d"})
         
        const response = NextResponse.json({
            message:"login successful",
            succes:true,
        })

          //set cookies
           response.cookies.set("token",token,{
            httpOnly:true
           })
           return response
    } catch (error) {
      return NextResponse.json({error: error.message},{status:500})  
    }
}