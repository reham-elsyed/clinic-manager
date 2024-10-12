import React from 'react'
import { imagestorage } from '../../../firebase'
function EmptyDate() {
  return (
    <div className='text-center flex flex-col justify-center items-center'>
        <img 
        className='w-2/3'
         src={`https://firebasestorage.googleapis.com/v0/b/authproject-fbe08.appspot.com/o/files%2F3.png?alt=media&token=7bd01d92-36f7-4ccd-8680-fb7e0d3cb844`} alt="No data" />
        <p className='text-zinc-800 text-xl md:text-3xl'>No Appointments Yet!</p>
    </div>
  )
}

export default EmptyDate