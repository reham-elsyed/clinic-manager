import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DoctorDatabaseContext } from '../../../context/DoctorDatabaseContext'

function RelatedDoctors({speciality, docId}) {
    const {docData} = useContext(DoctorDatabaseContext)
    const[relDoc, setRelDoc]= useState([])
const navigate = useNavigate()
    useEffect(()=>{
        if(docData.length > 0 && speciality){
            const doctorsData = docData.filter(doc=>doc.speciality == speciality && doc.id !== docId)
        setRelDoc(doctorsData)
        console.log(doctorsData)
        }
    },[docData, speciality,docId])
  return (
    <div className="py-5 md:py-20">
    <div className="text-center">
      <h2 className="text-3xl font-medium">Top Doctors</h2>
      <p className=' text-gray-600 text-sm md:text-lg lg:text-xl'>best doctors in town</p>
      </div>   
      <div className="container px-5 mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 relative gap-2 ">
      {relDoc?.slice(0,5).map((doctor, index)=>
     <div
     onClick={()=>{navigate(`/appointment/${doctor.id}`) ; scrollTo(0,0)}}
      key={index} className="card card-compact bg-base-100  shadow-xl">
     <figure>
       <img
       className="w-full"
         src={doctor.img}
         alt="doctor name" />
     </figure>
     <div className="card-body">
       <h2 className="card-title">{doctor.name}</h2>
       <p className="text-gray-600 text-sm">{doctor.speciality}</p>
      
     </div>
   </div>
      )}
      
      </div>
     
      <div className="card-actions p-5 justify-center items-center">
         <button
         onClick={()=>{navigate('/doctors'); scrollTo(0,0)}}
          className="btn btn-primary">See All Available Doctors</button>
       </div>
       </div>
  )
}

export default RelatedDoctors