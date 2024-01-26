import React from 'react'

function ProfileId({params}) {
  return (
    <div className='h-screen flex-col flex justify-center items-center gap-2'>
      <h1>Profile</h1>
      <hr />
      <p className='text-4xl'>Profile Page {params.id} </p>
    </div>
  )
}

export default ProfileId