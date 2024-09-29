import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import {createContext,useEffect, useState, useContext} from 'react';
import {auth } from '../firebase'

export const AuthContext = createContext()

const AuthContextProvider = ({children})=>{
const [currentUser, setCurrentUser] = useState(null)
const [loading, setIsLoading] = useState(true)

const signup =async (credentials) =>{
  const response = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
   const data = response.user.toJSON()
setCurrentUser(response)
   return response

}

const login =async (values)=>{
  const user = await  signInWithEmailAndPassword(auth, values.email, values.password)
  setCurrentUser(user.user)
  return(user)
}
const logout = async ()=>{
  localStorage.removeItem("role")
    const user = await signOut(auth)
setCurrentUser(null)   
 return user
}
const resetPassword=(values)=>{
    sendPasswordResetEmail(auth, values.email)
}
useEffect(() => {
  let unsubscribe;
  const subscribeToAuthChanges = () => {
    unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setCurrentUser(user);
        setIsLoading(false);
        console.log('Authenticated user:', user);
      } else {
        setCurrentUser(null);
        setIsLoading(false);
        console.log('Not authenticated');
      }
    });
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  };

  subscribeToAuthChanges();

  return () => {
    if (unsubscribe) {
      unsubscribe();
    }
  };
}, []);

useEffect(() => {
  const checkAuthState =  () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        // User not authenticated, redirect or show login screen
        console.log("User not authenticated");
      } else {
        setCurrentUser(user);
        setIsLoading(false);
        console.log("Authenticated user:", user);
      }
    } catch (error) {
      console.error("Error checking auth state:", error);
    }
  };
  // Check auth state immediately after component mounts
  checkAuthState();
  // Check auth state on every page load
  window.addEventListener('load', checkAuthState);
  return () => {
    window.removeEventListener('load', checkAuthState);
  };
}, []);

    return <AuthContext.Provider value={{currentUser,setCurrentUser, signup, logout, login, resetPassword}}>
{children}
    </AuthContext.Provider>
}
export default AuthContextProvider;