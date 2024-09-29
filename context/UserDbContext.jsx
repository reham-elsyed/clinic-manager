import { createContext, useContext } from "react";
import { db } from '../firebase';
import {useState, useEffect} from 'react';
import { AuthContext } from "./AuthContext";
import { addDoc , doc,setDoc, collection,deleteDoc,onSnapshot, getDoc, getDocs} from "firebase/firestore";
export const CreateUserDatabaseContext = createContext();

const CreateUserDatabaseContextProvider =({children})=>{
const {currentUser, setCurrentUser} = useContext(AuthContext)
const [userRole, setUserRole]= useState(null)


useEffect(()=>{

 const role= localStorage.getItem("role")
 console.log("getting role from local storage", role)
 if (role) {
 
  setUserRole(role);
}
},[])
//add data to users database
const addData = async (values, res) => {
  console.log(currentUser)
    try {
       const data= await setDoc(doc(db,"users", res.user.uid), values);  
      localStorage.setItem("role", values.role)
      setUserRole(values.role)
        console.log('Data added successfully' ,data);
      } catch (error) {
        console.log('Error adding data:', error);
      }
    };
//get data for the current user
 const getData = async (res) => {
        try {
          // Fetch the  user document
            const docRef =doc(db, "users", res.user.uid);
            const docSnap = await getDoc(docRef);
         console.log( docSnap.data().role )
          localStorage.setItem("role", docSnap.data().role )
          setUserRole(docSnap.data().role )
            console.log('Data added successfully' ,userRole);
            return docSnap.data()
          } catch (error) {
            console.log('Error adding data:', error);
          }
        };

        const deleteUser = async (id) => {
          try {
            // Fetch the  user document
              const docRef =doc(db, "users", id);
              const docSnap = await deleteDoc(docRef);
           
              console.log('Data deleted successfully',id);
              return docSnap.data()
            } catch (error) {
              console.log('Error deleting data:', error);
            }
          };


//get all data from users db
        const getAllData = async (limit = 100, offset = 0) => {
          try {
            const usersRef = collection(db, "users");
            const querySnapshot = (await getDocs(usersRef));
        
            const allUsers = querySnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }));
        
            console.log(`Fetched ${allUsers.length} users`);
            return allUsers;
          } catch (error) {
            console.error('Error fetching all data:', error);
            return error;
          }
        };
        
    const promoteToAdmin = async (userId) => {
      await updateDoc(doc(db, 'users', userId), { role: 'Admin' });
    };
    
    const demoteFromAdmin = async (userId) => {
      await updateDoc(doc(db, 'users'), { role: 'User' });
    };
return <CreateUserDatabaseContext.Provider value={{addData, getData, userRole, getAllData, deleteUser}}>
    {children}
</CreateUserDatabaseContext.Provider>
}
export default CreateUserDatabaseContextProvider