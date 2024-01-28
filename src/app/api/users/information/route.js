import { NextResponse,NextRequest } from "next/server";
import { connect } from "@/dbconfig/dbconfig";
import getUserDetails from '@/helpers/getUserDetails'
import User from "@/models/usermodel";

connect()

export async function GET(request){
   try {
     const userId = await getUserDetails(request)
    const user =  await User.findOne({_id:userId}).select("-password")
    return  NextResponse.json({
        message:"user found",
        data:user
    })
   } catch (error) {
    return NextResponse.json({error: error.message},{status:400})
   }
}