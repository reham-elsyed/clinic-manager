import { createContext, useContext } from "react";
import { db } from '../firebase';
import {useState, useEffect} from 'react';
import { AuthContext } from "../context/AuthContext";
import {auth } from '../firebase'
import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from 'firebase/auth';

import { addDoc ,query,where, doc,setDoc, collection,deleteDoc,onSnapshot, getDoc, getDocs} from "firebase/firestore";
export const DoctorDatabaseContext = createContext();

const DoctorDatabaseContextProvider =({children})=>{
const {currentUser} = useContext(AuthContext)
const [docData, setDocData]= useState([])
const addDoctorAndCreateAccount = async (values, res) => {
  console.log(currentUser)
    try {
        const response = await createUserWithEmailAndPassword(auth, values.email, values.password)
       const data= await setDoc(doc(db,"users",values.user_id ), values);  
     
     
        console.log('Doctor added successfully' ,data, response);
      return data
       
      } catch (error) {
        console.log('Error adding data:', error);
        throw error
      }
    };



 const getDoctorData = async (id) => {
             try {
          // Fetch the  user document
          const q = query(
            collection(db, 'users'),
            where("role", '==', 'doctor'),
            where('user_id', "==", id)
          )
            const docSnap = await getDocs(q);
            
    if (docSnap.empty) {
      console.log('No doctor documents found');
      return [];
    }
         
    const doctorData = docSnap.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
//const doctorData = docSnap.data()
    console.log('Doctor data successfully retrieved',doctorData);
  
   return doctorData[0]
          } catch (error) {
            console.log('Error adding data:', error);
          }
        };

        const getDoctorsData = async () => {
          try {
       // Fetch the  user document
       const q = query(
         collection(db, 'users'),
         where("role", '==', 'doctor')

       )
         const docSnap = await getDocs(q);
         
 if (docSnap.empty) {
   console.log('No doctor documents found');
   return [];
 }
      
 const doctorsData = docSnap.docs.map(doc => ({
   id: doc.id,
   ...doc.data()
 }));

 console.log('Doctors data successfully retrieved',doctorsData);
setDocData(doctorsData);
return doctorsData
       } catch (error) {
         console.log('Error adding data:', error);
       }
     };

////////

    const promoteToAdmin = async (userId) => {
      await updateDoc(doc(db, 'users', userId), { role: 'Admin' });
    };
    
    const demoteFromAdmin = async (userId) => {
      await updateDoc(doc(db, 'users'), { role: 'User' });
    };
return <DoctorDatabaseContext.Provider value={{docData,getDoctorsData,getDoctorData, addDoctorAndCreateAccount}}>
    {children}
</DoctorDatabaseContext.Provider>
}
export default DoctorDatabaseContextProvider