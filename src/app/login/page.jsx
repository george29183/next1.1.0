"use client";
import React, { useEffect, useState } from "react";
import {useRouter} from 'next/navigation'
import axios from 'axios'
import Link from "next/link";
import toast from "react-hot-toast";
function LoginPage() {
  const router = useRouter()
  const [user,setUser] = useState({
    email:'',
    password:'',

  })
  const [btnDisabled,setBtnDisabled] = useState(false)
  const [loading,setLoading] = useState(false)
  const onLogin = async () =>{
     try {
        setLoading(true)
        const response = await axios.post("/api/users/login",user)
        console.log("login success",response.data);
        toast.success("login success")
        router.push('/profile')
     } catch (error) {
      console.log("login failed", error.message);
      toast.error(error.message)
     }finally{
      setLoading(false)
     }
  }
  useEffect(()=>{
    if(user.email.length > 0 && user.password.length > 0){
      setBtnDisabled(false)
    }else{
      setBtnDisabled(true)
    }
  },[user])
  return (
    <div className="flex justify-center items-center h-screen">
        <div className="flex items-center  flex-col gap-1">
           <h1>LogIn</h1>
           <hr />
            <label className="self-start" htmlFor="email">email</label>
           <input type="email" 
           value={user.email}
           onChange={(e)=>setUser({...user,email:e.target.value})}
           placeholder="email"
           className="px-4 py-2 text-[#212121]"
           />
            <label className="self-start" htmlFor="password">password</label>
           <input type="password" 
           value={user.password}
           onChange={(e)=>setUser({...user,password:e.target.value})}
           placeholder="password"
           className="px-4 py-2 text-[#212121]"
           />
           <button onClick={onLogin} className="px-3 py-2 mt-3 text-[#212121] bg-[#f5f5f5]">submit</button>
           <Link href='/signup'>sign up</Link>
        </div>
    </div>
  )
}

export default LoginPage