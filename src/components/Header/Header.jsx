import React from 'react'

function Header() {
  return (
    <div className="hero  min-h-screen">
    <div className="hero-content bg-fuchsia-300 rounded-md p-36 flex-col lg:flex-row-reverse">
      <img
        src={`https://firebasestorage.googleapis.com/v0/b/authproject-fbe08.appspot.com/o/files%2Fheader_img.png?alt=media&token=e63b8f05-68e2-43e9-8c5e-79fc866efc70`} alt="header img"
        className="bg-inherit max-w-sm rounded-lg" loading="lazy" />
      <div>
        <h1 className="text-5xl font-bold"> Book Appointment <br/>with trusted Doctors</h1>
        <div className="flex justify-between items-center">
            <img className='w-28 py-5' src={`https://firebasestorage.googleapis.com/v0/b/authproject-fbe08.appspot.com/o/files%2Fgroup_profiles.png?alt=media&token=b0d577a9-8294-431c-a2d2-b3d98b65cbf1`} alt="" />
        <p className="py-6">
        simply browse through our group of doctors<br className='hidden md:block'/>schedual your appointment
        </p>
        </div>
        <a href="#speciality" className="btn border-cyan-500 bg-cyan-800 text-white">Book appointment 
        </a>
      </div>
    </div>
  </div>
  )
}

export default Header