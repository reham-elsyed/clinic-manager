import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AuthContextProvider, { AuthContext } from '../context/AuthContext.jsx'
import  CreateUserDatabaseContextProvider from '../context/UserDbContext.jsx'
import DoctorDatabaseContextProvider from '../context/DoctorDatabaseContext.jsx'
import AvailableSlotsContextProvider from '../context/AvailableSlotsContext.jsx'
import AppointmentContextProvider from '../context/AppointmentContext.jsx'
// import AppointmentContextProvider from '../context/AppointmentContext.jsx'

createRoot(document.getElementById('root')).render(

  <AuthContextProvider>
    <CreateUserDatabaseContextProvider>
      <DoctorDatabaseContextProvider>
        <AvailableSlotsContextProvider>
          <AppointmentContextProvider>
              <StrictMode>
                <App />
                </StrictMode>
          </AppointmentContextProvider>
        </AvailableSlotsContextProvider>
      </DoctorDatabaseContextProvider>
    </CreateUserDatabaseContextProvider>
  </AuthContextProvider>
  
    
)