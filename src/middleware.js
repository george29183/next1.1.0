import { NextResponse, NextRequest } from "next/server";

export function middleware(request){
   const path = request.nextUrl.pathname
   const isPublicPath = path === '/login'|| path === '/signup' || path === '/verifyemail'
   //check for cookies
   const token = request.cookies.get('token')?.value || ''
   if(isPublicPath && token){
    return NextResponse.redirect(new URL('/',request.nextUrl))
}
     
   //no public path and no token
   if(!isPublicPath && !token){
    return NextResponse.redirect(new URL('/login',request.nextUrl))
}

}
export const config = {
    matcher: [
        '/',
        '/profile',
        '/login',
        '/signup',
        '/verifyemail'
    ]
}