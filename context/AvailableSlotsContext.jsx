import { useEffect, createContext, useContext,useState } from "react";
import {db} from '../firebase';
import { addDoc , doc,setDoc, collection,deleteDoc,onSnapshot, getDoc,updateDoc, getDocs,query, where} from "firebase/firestore";
import { DateTime } from "luxon";
import { DoctorDatabaseContext } from "./DoctorDatabaseContext";

export const AvailableSlotsContext = createContext()

const AvailableSlotsContextProvider = ({children})=>{
const {getDoctorsData}= useContext(DoctorDatabaseContext);
function generateSchedual(doctorId){
    const startOfWeek =  DateTime.now();
const endOfWeek = startOfWeek.plus({weeks: 1}).startOf('day')
const schedule= []

for (let day = startOfWeek; day < endOfWeek; day = day.plus({days:1}))
{
    const date = day.toISODate();
    for (let hour = 9; hour < 18; hour++){
        const startTime = `${hour}:00`;
        const endTime = `${hour + 1}:00`;
        const key = `${doctorId}-${date}-${startTime}`;
        schedule.push({
          key,
            doctorId,
            date,
            startTime,
            endTime,
            available: true
        })
    }
}
console.log(schedule)
return schedule
}



async function saveDoctorSchedule(doctorId){
    const schedule = generateSchedual(doctorId);
    try{
        // await db.collection('availableslots').doc(`${doctorId}`).set(schedule);
        schedule.map(async item=>
        {
          let  docRef =doc(db,"AvailableSlots", item.key)
          let { doctorId,
            date,
            startTime,
            endTime,
            available} = schedule
          await setDoc(docRef, item
            )
        }
        )
     
        console.log(`Schedule saved for Doctor ${doctorId}`);
        return ({message:'success'})
    } catch (error) {
      console.error('Error saving schedule:', error);
      throw error
    }
    }
/// get eachdoctor slots
    async function getDoctorSlots(doctorId) {
      try{
        const q = query(collection(db, "AvailableSlots"), 
        where("doctorId", "==", doctorId)
      );
      const querySnapshot = await getDocs(q);
      const slots = querySnapshot.docs.map(doc => doc.data());
    console.log(slots);
    return slots;
      }
    catch(err){
      console.log(err)
      throw err
    }
    }

    async function updateAvailableProperty(appoint) {
      try {
        const docRef = doc(db, 'AvailableSlots',appoint.key );
        const docSnapshot = await getDoc(docRef);
        
        if (!docSnapshot.exists()) {
          console.log('Document does not exist!');
          throw new Error('Document does not exist');
        }
    
        const data = docSnapshot.data();
        let key = appoint.key
        // Update the available property
        data.available = false
        
        // Write back the updated data
        await updateDoc(docRef, data);
        
        return { success: true, message: 'Successfully updated the available property' };
      } catch (error) {
        throw ( error);
      }
    }



    async function unUpdateAvailableSlot(appointment){
      try {
        const docRef = doc(db, 'AvailableSlots',appointment.key );
        const docSnapshot = await getDoc(docRef);
        
        if (!docSnapshot.exists()) {
          console.log('Document does not exist!');
          return;
        }
    
        const data = docSnapshot.data();
   
        // Update the available property
        data.available = true
        
        // Write back the updated data
        await updateDoc(docRef, data);
        
        console.log('Successfully updated the available property');
      } catch (error) {
        console.error('Error updating the available property:', error);
      }
    }

async function getAlldoctorsId(){
   const doctorsData= await getDoctorsData()
   console.log(doctorsData)
   const ids = doctorsData.map(doc=>doc.user_id)
   return doctorsData
}
     
 const fetchAndDeleteOldSchedules = async () => {

    const q = query(collection(db, "AvailableSlots"), 
    where("date", "<", DateTime.now().toISODate())
  );
      await deleteOldSchedule(q)
}

async function deleteAvailableSlots(id){
const q = query(collection(db, "AvailableSlots"),
where ("doctorid","==",id)
)
await  deleteOldSchedule(q)
      }

async function deleteOldSchedule(q){
      try{
    const snapshot = await getDocs(q)
    if (snapshot.docs.length > 0) {
      const docDataSchedule = snapshot.docs.map(async item=>{let res =await deleteDoc(item.ref)
    console.log(res)})
    }
      console.log(`Deleted  documents`);
      }
     catch(err){
console.log("error in delete", err)
     }
    }
    async function updateAllDoctorSchedules() {
      try{
        await fetchAndDeleteOldSchedules()
        const doctors =await getAlldoctorsId()
        if(doctors){
         doctors.map(async doctor=>  await saveDoctorSchedule(doctor.user_id))}
      }catch(err){
        console.log(err)
      }
     }
    
    
      useEffect(() => {
        const intervalId = setInterval(updateAllDoctorSchedules, 1000 * 60 * 60 * 24 * 7); // weekly
    
        return () => clearInterval(intervalId);
      }, []);
    return <AvailableSlotsContext.Provider value={{unUpdateAvailableSlot, saveDoctorSchedule, getDoctorSlots, updateAvailableProperty, deleteAvailableSlots}} >

        {children}
    </AvailableSlotsContext.Provider>
}

export default AvailableSlotsContextProvider;