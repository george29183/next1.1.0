import { NextResponse, NextRequest } from "next/server";
import  Jwt  from "jsonwebtoken";

export default async function getUserDetails(request){
  try {
    // get token
     const token = await request.cookies.get("token")?.value || ""
     const decodedToken = Jwt.verify(token,process.env.TOKEN_SECRET)
     return decodedToken.id
  } catch (error) {
   throw new Error(error.message)
  }
}