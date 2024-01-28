"use client"
import axios from "axios"
import Link from "next/link"
import React,{useState,useEffect} from "react"

export default function VerifyEmailPage(){
    const [token,setToken] = useState('')
    const [verified,setVerified] = useState(false)
    const [error,setError] = useState(false)

    const verifyEmail = async ()=>{
        try {
            await axios.post("/api/users/verifyEmail",{token})
             setVerified(true)
        } catch (error) {
            setError(true)
            throw new Error(error)
        }
    }
     useEffect(()=>{
         const urlToken = window.location.search.split('=')[1]
         setToken(urlToken || '')
     },[])
    useEffect(()=>{
        if(token.length>0){
            verifyEmail()
        }
    },[token])

    return (
        <div className="h-screen flex justify-center items-center flex-col text-white gap-2">
             <h1 className="">Verify Email</h1>
             <h2 className="text-orange-700">{token? token :"no token no access"}</h2>
            {verified && (
                <div>
                    <h1>email verified!</h1>
                    <Link href='/login'>
                      login
                    </Link>
                </div>
            )}
            {error &&
              <h2>error</h2>
            }
        </div>
    )
}
