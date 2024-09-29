import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AuthContextProvider, { AuthContext } from '../context/AuthContext.jsx'
import  CreateUserDatabaseContextProvider from '../context/UserDbContext.jsx'
// import DoctorDatabaseContextProvider from '../context/DoctorDatabaseContext.jsx'
// import AppointmentContextProvider from '../context/AppointmentContext.jsx'
// import AvailableSlotsContextProvider from '../context/AvailableSlotsContext.jsx'

createRoot(document.getElementById('root')).render(

    <AuthContextProvider>
    <CreateUserDatabaseContextProvider>
              <StrictMode>
                <App />
                </StrictMode>
                </CreateUserDatabaseContextProvider>
                </AuthContextProvider>
  
    
)