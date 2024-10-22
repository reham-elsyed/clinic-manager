import React, { useEffect , useState, useContext, useMemo} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import RelatedDoctors from '../RelatedDoctors/RelatedDoctors'
import { AuthContext } from '../../../context/AuthContext'
import { AppointmentContext } from '../../../context/AppointmentContext'
import { useQuery } from '@tanstack/react-query'
import { DoctorDatabaseContext } from '../../../context/DoctorDatabaseContext'
import { AvailableSlotsContext } from '../../../context/AvailableSlotsContext'
import { DateTime } from 'luxon'
import { useQueryClient } from '@tanstack/react-query';
import 'react-toastify/dist/ReactToastify.css';

import { CreateUserDatabaseContext } from '../../../context/UserDbContext'
import { toast } from 'react-toastify'
import Loader from '../Loader/Loader'
function Appointment() {
  const[docSlots, setDocSlots] = useState([]);
const [slotIndex,setSlotIndex] = useState(0)
const [slotTimeIndex,setSlotTimeIndex] = useState(0)
const [slotTime, setSlotTime] = useState('');
const [isNotAvailable, setIsNotAvailable] = useState(false)
const {userRole} = useContext(CreateUserDatabaseContext)
const navigate = useNavigate()
const queryClient=useQueryClient()

const {currentUser} = useContext(AuthContext);
const { getDoctorSlots,updateAvailableProperty} =useContext(AvailableSlotsContext)
const {getDoctorData ,docData } = useContext(DoctorDatabaseContext)
 const {addAppointment, getAllAppointmentData} = useContext(AppointmentContext)
  const {doctorId} = useParams()
  
  const { error, data, isLoading } = useQuery({
    queryKey: ["doctorAppointmentSlots", doctorId],
    queryFn: () => getDoctorSlots(doctorId),

  });
  const { error: docError, data: docdata, isLoading:isLoadingDoc } = useQuery({
    queryKey: ["doctorData"],
    queryFn: () => getDoctorData(doctorId),
   
  });
  //////////////////////////////////////////
 
    useMemo(() => {
      if (!data || !Array.isArray(data)) return new Map();
      
    const groupedAppointments = data.reduce((acc, appointment) => {
        const date = appointment.date;
        if (!acc.has(date)) acc.set(date, []);
        acc.get(date).push(appointment);
     
        return acc;
      }, new Map());
   

      const dailyTimeSlots = Array.from(groupedAppointments.values()).map(appointments => {
        const timeSlot = appointments.map(appointment => ({
          available: appointment.available,
          key: appointment.key,
          doctorId: appointment.doctorId,
          date: new DateTime(appointment.date).toISODate(),
          startTime:`${(appointment.startTime)  } PM` ,
          endTime:appointment.endTime
        }));
      
        // Sort time slots alphabetically
       // timeSlot.sort((a, b) => a.startTime.localeCompare(b.startTime));
     
      
        return timeSlot;
      });
       setDocSlots(dailyTimeSlots)
      console.log(dailyTimeSlots)
    }, [data]);


 async function handleBookingData(){
  if (currentUser && userRole == "user"){
    try{
      const appointment= docSlots[slotIndex][slotTimeIndex]
     const updated_booking = await updateAvailableProperty(appointment);
     if(updated_booking.success){
     toast.success(updated_booking.message)
     }
     const patientAppoint = {patient_id: currentUser.uid ,...appointment}
     const result = await addAppointment(patientAppoint);
     queryClient.invalidateQueries({ queryKey: ['adminapppointment'] });

    console.log(result); 
    }catch (err){
     
    toast.error(err)
    }}
   else{
    
  toast.error("not authorized")
    navigate("/login")
   }
 }
   
const fetchDoctor = async ()=>{
  if( doctorId){
    console.log(docdata)
    console.log(doctorId)
    //const docInf = docData?.find(doc => doc.id === doctorId)
   // setDocInfo(docInf)  

  }}
 useEffect(()=>{
  fetchDoctor()
 },[doctorId])


  return (
    <div className="container mx-auto px-5">
      {isLoadingDoc&& <Loader/>}
{docdata?
      <div className="  card md:card-side bg-base-100 ">
        <div className="lg:w-1/3 m-2">
        <figure className='bg-slate-500 h-full'>
    <img
    className=" pt-3 self-end"
      src={docdata?.img}
      alt={docdata?.name} />
  </figure>
        </div>
 
  <div className="card-body m-2 border-1 border-gray-500 md:w-2/3 shadow-xl">
   <div className='flex'>
   <h2 className="card-title">{docdata?.name}</h2>
   <img className="h-3 w-3" src={`https://firebasestorage.googleapis.com/v0/b/authproject-fbe08.appspot.com/o/files%2Fverified_icon.svg?alt=media&token=9db092ec-79c6-47f3-8d74-49dd7e257911`} alt="verified" />
   </div>
    <div>
    <p>{docdata?.speciality}</p>
      <p className='badge badge-secondary'>{docdata?.experience}</p></div>
    <p>About:<br/>{docdata?.about}</p>
   
    
    <p> Fee: ${docdata?.fees}</p>
   
  </div>
</div>:<Loader/>}
<div className='p-3'>
      <h2>Available Time Slots:</h2>
      <div  className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
      { docSlots?.map((week, weekIndex) =>
  <>
   
      <div key={weekIndex} onClick={() => setSlotIndex(weekIndex)} className={`text-center py-6 rounded-full min-w-16 cursor-pointer ${slotIndex === weekIndex ? 'bg-orange-700 text-white' : 'bg-slate-400 text-orange-100'}`}>
        <p>{new DateTime(week[0].date).toFormat('dd-MM-yy')}</p>
      </div>
      </>)}
      </div>
    <div className='flex item-center gap-3 overflow-x-scroll mt-4'>
      {docSlots[slotIndex]?.map((day, dayIndex) => 
        <p 
          onClick={() => {setSlotTime(day?.startTime || ''), setSlotTimeIndex(dayIndex)}} 
          className={`${day.available? 'block' : 'hidden'} text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${day?.startTime === slotTime ? 'bg-orange-600 text-white' : 'border border-slate-400 bg-stone-800 text-white'}`} 
          key={dayIndex}
        >
          {day?.startTime ?day.startTime : 'N/A'}
         
        </p>
      )}
    </div>
   </div>
    <div className="card-actions justify-end mt-5">
      <button onClick={()=>{handleBookingData()}} className="btn btn-primary">book appointment</button>
    </div>
    <RelatedDoctors docId={doctorId} speciality={docdata?.speciality}/>
    </div>
  )
}

export default Appointment