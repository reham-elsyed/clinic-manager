import React, { useContext, useState,useMemo ,useEffect} from 'react'
import { useQuery } from '@tanstack/react-query'
import { CreateUserDatabaseContext } from '../../../context/UserDbContext'
import { useNavigate } from 'react-router-dom'
import { AppointmentContext } from '../../../context/AppointmentContext'
import { AvailableSlotsContext } from '../../../context/AvailableSlotsContext'
import { AuthContext } from "../../../context/AuthContext";
import { useQueryClient } from '@tanstack/react-query';
import EmptyDate from '../EmptyData/EmptyDate'
function UserAccount() {
const queryClient=useQueryClient()
const navigate = useNavigate()
const {unUpdateAvailableSlot} = useContext(AvailableSlotsContext)
const {currentUser}= useContext(AuthContext)

const {getAllData, userRole} = useContext(CreateUserDatabaseContext)


const {getPatientAppointmentData, removeAppointment} = useContext(AppointmentContext)
    const{isLoading: dataLoading, error: appErr, data: appData } = useQuery({queryKey:['adminapppointment'],queryFn: async () => {
      try {
        const doctors = await getAllData()
        console.log('currentUser?.uid:', currentUser?.uid)
        
        const appointments = await getPatientAppointmentData(currentUser?.uid)
        console.log('patient Appointments:', appointments)
        
        return { doctors, appointments }
      } catch (err) {
        console.error('Error fetching data:', err)
        throw err
      }
    },
   staleTime: 600, })

// function handleNumDisplay(appData){
//   console.log('Query successful', appData);
    
//   if (!appData || !appData.doctors || !appData.appointments) {
//     console.error('Invalid data structure');
//   //  setIsLoading(false);
//    // setError('Failed to load appointment data');
//     return;
//   }
//   const doctors = appData.doctors.filter((item) => item.role === 'doctor')
//   const patients = appData.doctors.filter((item) => item.role === 'user')
 
// console.log(doctors.length)
//   setNumOfDoctors(doctors.length)
//   setNumOfPatients(patients.length)
//  // setIsLoading(false)
// }
// useEffect(()=>{
//   handleNumDisplay(appData)
// }, appData)

async function handleRemove(app){
try{
  console.log(app)
  await removeAppointment(app)
  await unUpdateAvailableSlot(app)
  queryClient.invalidateQueries({ queryKey: ['adminapppointment'] });
} catch(err){
  console.log(err)
}
}


  return (
    <div>
        {dataLoading?<div>... loading</div>:null}
        {appErr?<div>something went wrong</div>:null}

        <div className ="">
        <div className="overflow-x-auto">

        {appData?.appointments.length == 0? <EmptyDate/>:
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>
        <th>Patient Name</th>
        <th>Time of consultation</th>
        <th>Doctor and Speciality</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {/* rows */}
      
    
      
 {appData?.appointments?.map((app)=>

<tr key={app.key}>
<th>
  <label>
    <input type="checkbox" className="checkbox" />
  </label>
</th>
<td>
  <div className="flex items-center gap-3">
    <div className="avatar">
      <div className="mask mask-squircle h-12 w-12">
        <img
          src="https://img.daisyui.com/images/profile/demo/2@94.webp"
          alt="Avatar Tailwind CSS Component" />
      </div>
    </div>
    <div>
      <div className="font-bold"> {app.doctorId && appData.doctors.some(doc => doc.id === app.patient_id) 
        ? appData.doctors.find(doc => doc.id === app.patient_id).name
        : 'No doctor assigned'}</div>
      
    </div>
  </div>
</td>
<td><div className="text-sm opacity-50">{app.date}</div>
<div className="text-sm opacity-50">{app.startTime}</div>
</td>
<td>
  Doctor:
  <br />
  <span className="badge badge-ghost badge-sm">  {app.doctorId && appData.doctors.some(doc => doc.user_id === app.doctorId) 
        ? appData.doctors.find(doc => doc.user_id === app.doctorId).name
        : 'No doctor assigned'}</span><br/>
         <span className="badge badge-ghost badge-sm">  {app.doctorId && appData.doctors.some(doc => doc.user_id === app.doctorId) 
        ? appData.doctors.find(doc => doc.user_id === app.doctorId).speciality
        : 'No doctor assigned'}</span>
</td>

<th>
  <button onClick={()=>{handleRemove(app)}} className="btn btn-ghost btn-xs">Cancel appointment</button>
</th>
</tr> 
     
)}
    </tbody>
   
  </table>
   }
</div>
     </div>
    </div>
  )
}

export default UserAccount