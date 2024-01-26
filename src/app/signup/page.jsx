"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {useRouter} from 'next/navigation'
import axios from 'axios'
import toast from "react-hot-toast";
function SignUp() {
  const router = useRouter()
  const [user,setUser] = useState({
    email:'',
    password:'',
    username:''
  })
  const [btnDisabled,setBtnDisabled] = useState(false)
  const [loading, setLoading] = useState(false)
  const onSignUp = async () =>{
   try {
      setLoading(true)
     const response = await axios.post("/api/users/signup",user)
     console.log("sign up success");
     router.push('/login')
   } catch (error) {
    toast.error(error.message)
   }finally{
    setLoading(false)
   }
  }
  useEffect(()=>{
    if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
      setBtnDisabled(false)
    }else{
      setBtnDisabled(true)
    }
  },[user])
  return (
    <div className="flex justify-center items-center h-screen">
        <div className="flex items-center  flex-col gap-1">
           <h1>{loading?"processing":"sign up"}</h1>
           <hr />
           <label className="self-start" htmlFor="username">username</label>
           <input type="text" 
           value={user.username}
           onChange={(e)=>setUser({...user,username:e.target.value})}
           placeholder="username"
           className="px-4 py-2 text-[#212121]"
           />
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
           <button disabled={btnDisabled?true:null} onClick={onSignUp} className="px-3 mt-3 py-2 text-[#212121] bg-[#f5f5f5]">{btnDisabled?"no sign up":"sign up"}</button>
           <Link href='/login'>login</Link>
        </div>
    </div>
  )
}

export default SignUp