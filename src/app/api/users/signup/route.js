import { connect } from "@/dbconfig/dbconfig"; 
import User from "@/models/usermodel";
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import { sendEmail } from "@/helpers/nodemailer";
connect()


export async function POST(request){
    try {
      const reqBody =  await request.json()
      const {username, email, password} = reqBody
      console.log(reqBody);

      //check if user already exists
     const user = await User.findOne({email})
     user?NextResponse.json({error:"user already exists"}, {status:400}):null

     //hash password
     const salt = await bcryptjs.genSalt(10)
     const hashedPassword = await bcryptjs.hash(password,salt)

     // create a new user
     const newUser = new User({
        username,
        email,
        password: hashedPassword
     })

     const savedUser = await newUser.save()
     console.log(savedUser);

     //send verification email
     await sendEmail({email, emailType:'VERIFY',userId:savedUser._id})


          console.log("saved"); 
     return NextResponse.json({
        message:"user created succesfully",
        success:true,
        savedUser
     })

    } catch (error) {
        return NextResponse.json({error:error.message},{status:500})
    }
}