import React from 'react'

function ProfileId({params}) {
  return (
    <div className='h-screen flex-col flex justify-center items-center gap-2'>
      <h1>Profile</h1>
      <hr />
      <p className='text-3xl gap-2 flex justify-center items-center'>Profile Page <span className='p-2 bg-orange-600 text-black rounded-lg '>{params.id}</span> </p>
    </div>
  )
} 

export default ProfileId