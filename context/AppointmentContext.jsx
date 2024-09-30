import { createContext, useContext } from "react";
import { db } from '../firebase';
import {useState, useEffect} from 'react';
import { AuthContext } from "../context/AuthContext";
import { addDoc,where, query , doc,setDoc, collection,deleteDoc,onSnapshot, getDoc, getDocs} from "firebase/firestore";


export const AppointmentContext = createContext();

export default function AppointmentContextProvider({children}){
const {currentUser}= useContext(AuthContext)

const addAppointment = async (values)=>{
    try{
        const data = await setDoc(doc(db,"appointments", values.key), values)
        return ("appointment added Added Successfully")

    }catch (err){console.log("error", err)}
}

const getAllAppointmentData = async()=>{
try{
    const userRef = collection(db, 'appointments');
    const querySnapshot = await getDocs(userRef);
    
    const allUsers = querySnapshot.docs.map(doc => ({
        ...doc.data()
       ,id:doc.id
      }));
  console.log(allUsers)
    return allUsers
}catch (err){
    console.log(err)
}
}
const getPatientAppointmentData = async(id)=>{
    try{
        const q = query(collection(db, 'appointments'),
            where("patient_id", "==",id)
        )
        const querySnapshot = await getDocs(q);
        
        const allUserAppointments = querySnapshot.docs.map(doc => ({
            id:doc.id,
            ...doc.data()
           
          }));
      console.log("allUserAppointments",allUserAppointments)
        return allUserAppointments
    }catch (err){
        console.log(err)
    }
    }
    async function removeAppointment(appointment){
        try{
            console.log(appointment)
            const key = (appointment.key)
   
            const querySnapshot =await deleteDoc(doc(db, "appointments", appointment.id))
         
            console.log("data removed from appointments")
        } catch(err){
            console.log(err)
        }
     
    }
    return <AppointmentContext.Provider value={{removeAppointment,addAppointment, getAllAppointmentData,getPatientAppointmentData }}>
        {children}
    </AppointmentContext.Provider>
}
