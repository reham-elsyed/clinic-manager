import React, { useContext, useEffect, useState } from 'react'
import {useNavigate, useParams} from'react-router-dom'
import { specialityData } from '../../assets/asset'
import { useQuery } from '@tanstack/react-query'
import { DoctorDatabaseContext } from '../../../context/DoctorDatabaseContext'
import { CreateUserDatabaseContext } from '../../../context/UserDbContext'
import {AvailableSlotsContext} from '../../../context/AvailableSlotsContext'
function Doctors() {
  const {speciality}= useParams()
  const navigate = useNavigate()

  const {userRole, deleteUser} = useContext(CreateUserDatabaseContext)
  const [dataDisplay, setDataDisplay] = useState([])
  const {getDoctorsData} = useContext(DoctorDatabaseContext)
const {deleteAvailableSlots} =useContext(AvailableSlotsContext)
  const {error, data, isLoading} = useQuery({queryKey:["doctorAll"],queryFn:helperGetDoctorsData })

async function helperGetDoctorsData(){
return await getDoctorsData()

}

  function filterDoctors(specialdoc){
    if (specialdoc){
      const filteredData = data.filter(doc=> doc.speciality === specialdoc)
setDataDisplay(filteredData)
console.log(filteredData)
    }
    else{
      console.log(data)
      setDataDisplay(data)
    }
  }
  
  useEffect(() => {
    
    console.log(speciality)
     if(speciality){
      const filteredData = data?.filter(doc => doc.speciality === speciality)
        setDataDisplay(filteredData)
      console.log(filteredData)
     }else{
      console.log(data)
      setDataDisplay(data)
     
     }  
     console.log(dataDisplay)
  }, [speciality, data])
  
async function handleDeletDoctor(id){
  try{
    await deleteUser(id);
    await deleteAvailableSlots(id)
        
  }catch(err){
    console.log(err)
  }

}



  return (
    <div className='px-5 mx-auto py-5' >
      <h2 className="text-gray-900 text-3xl md:text-lg sm:text-base">Browse through the doctors specialists</h2>
      <div className="flex py-5">
        <div role="tablist" className="flex flex-col gap-2 bg-white tabs-boxed">
         {specialityData.map(spec=>
          <p role="tab" className="btn bg-fuchsia-100" onClick={()=>{filterDoctors(spec.speciality)}}>{spec.speciality}</p>
         )}
        </div>
        <div className="container px-5 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-col-3 lg:grid-cols-5 relative gap-2 ">
          {dataDisplay?.map((doctor, index)=>
          <div>
       <div
       onClick={()=>{navigate(`/appointment/${doctor.id}`)}}
        key={index} className="card card-compact bg-base-100 min-h-full  shadow-xl">
          
       <figure>
         <img
         className="w-full"
           src={doctor?.img}
           alt={doctor.name} />
       </figure>
       <div className="card-body ">
         <h2 className="card-title text-sm md:text-md lg:text-lg">{doctor.name}</h2>
         <p className="text-gray-600 text-sm">{doctor.speciality}</p>
        
       </div>
     </div>
   {userRole === 'admin'?
   <div className='flex justify-center'>
     <button
   onClick={()=>{handleDeletDoctor(doctor.user_id)}}
   className="btn btn-xs  bg-red-500 text-white text-xs -translate-y-9">remove doctor</button>
   </div>
  : null}
    </div>
    )}
        </div>
      </div>
    </div>
  )
}

export default Doctors