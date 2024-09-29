import React from 'react'
import { specialityData } from '../../assets/asset'
import { Link } from 'react-router-dom'

function SpecialityMenu() {
  return (
    <div id='speciality' className='py-5 md:py-20 px-5 mx-auto'>

<div className="card bg-base-100 w-full  ">
  <div className="card-body justify-center items-center">
    <h2 className="card-title justify-center">Find by Speciality</h2>
    <p >Simply choose through our list of best doctors</p>
  </div>
  <figure>
  <div className="carousel w-screen md:w-fit rounded-box">
    {specialityData.map((data, index)=>
  <div key={index} className="carousel-item text-center">
    <Link 
    className="flex flex-col p-5 items-center text-xs md:text-sm "
     to={`/doctors/${data.speciality}`}>
    <img
    className='px-1  hover:-translate-y-3 transition-transform duration-500 '
      src={data.image}
      alt={data.speciality} />
      <p className='px-2'>{data.speciality}</p>
      </Link>
  </div>)}
  </div>
  </figure>
</div>
 
    </div>
  )
}

export default SpecialityMenu