"use client"
import React,{useState} from 'react'
import axios from 'axios'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
 
function ProfilePage() {
  const [data,setData] = useState('')
    const router = useRouter()
    const logout = async ()=>{
       try {
       await axios.get('api/users/logout')
       toast.success('logout success')
       router.push('/login')
       } catch (error) {
         console.log(error.message);
         toast.error(error.message)
       }
    }
    const getDetails = async ()=>{
      const res = await axios.get("/api/users/information")
      console.log(res.data);
     setData(res.data.data._id)
    }
  return (
    <div className='h-screen flex-col flex justify-center items-center gap-2'>
      <h1>Profile</h1>
      <hr />
      <p>Profile Page </p>
      <h2><Link href={`/profile/${data}`}>{data === ''?"no data":data}</Link></h2>
      <hr />
      <button className='bg-white hover:scale-105 transition text-black rounded-lg px-2 py-1' onClick={getDetails}>
        Get Details
      </button>
      <button
      onClick={logout}
      >logout</button>
    </div>
  )
}

export default ProfilePage