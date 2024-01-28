import { NextRequest,NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/usermodel";

connect()
export async function POST(request){
    try {
        const reqBody = await request.json()
        const {token} = reqBody
        console.log(token);
      const user = await  User.findOne({verifyToken:token,
        verifyTokenExpiry:{$gt:Date.now()}})
       
        if(!user){
            return NextResponse.json({error:"invalid user"},{status:400})
        }
        console.log(user);

        user.isVerfied = true
        user.verifyToken = undefined
        user.verifyTokenExpiry = undefined
        await user.save()

        return NextResponse.json({
            message:"email verified",
            success:true
        })
    } catch (error) {
        return NextResponse.json({error:error.message},
            {status:500})
    }
}