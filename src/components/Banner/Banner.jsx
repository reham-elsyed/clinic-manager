import React from 'react'
import { useNavigate } from 'react-router-dom'
function Banner() {
    const navigate = useNavigate()
  return (
    <div className='container my-10 px-5 mx-auto bg-fuchsia-300 rounded-md  border-t-4 border-t-yellow-400'>
        <div className="card justify-center items-center md:flex-row lg:card-side  ">
 
  <div className="card-body py-8 sm:py-10 md:py-16 lg:py-24 relative">
    <h2 className="card-title">Book Appointment
        <br/>With 100+ trusted Doctors
    </h2>
    <p></p>
    <div className="card-actions ">
      <button onClick={()=>{navigate('./login') ; scrollTo(0,0)}} className="btn btn-primary hover:scale-105 hover:bg-indigo-950 transition-all text-white bg-indigo-900">Create Account</button>
    </div>
  </div>
  <figure className='' >
    <img
    className="w-full max-w-md bg-inherit  hidden md:block h-[430px]  absolute bottom-0 right-0 z-50  md:w-1/2 lg:w-[375px]"
      src={`https://firebasestorage.googleapis.com/v0/b/authproject-fbe08.appspot.com/o/files%2Fappointment_img.png?alt=media&token=29f0b347-9552-47c6-9e34-e4eb285c6493`}
      alt="Album" loading="lazy" />
  </figure>
</div>
    </div>
  )
}

export default Banner