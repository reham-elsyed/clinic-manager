
import './App.css'
import Home from './components/Home/Home'
 import Doctors from './components/Doctors/Doctors'
//import Login from './components/Login/Login'
import Layout from './components/Layout/Layout'
import About from './components/About/About'
import Contact from './components/Contact/Contact'
 import UserAccount from './components/UserAccountData/UserAccountData'
 import AdminDashboard from './components/AdminDashboard/AdminDashboard'
import Signup from './components/Signup/Signup'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ProtectedAuth from './components/ProtectedAuth/ProtectedAuth'
import ProtectedRoutesUser from './components/ProtectedRoutesUser/ProtctedRoutesUser'
import MyProfile from './components/MyProfile/MyProfile'
import ProtectedRoutesAdmin from './components/ProtectedRoutesAdmin/ProtectedRoutesAdmin'
import Appointment from './components/Appointment/Appointment'
import { ToastContainer } from 'react-toastify'
import DynamicForm from './components/CentralizedForm/signInNew'

const router = createBrowserRouter([{
  path:"",
  element:<Layout/>,
  children:[
    {
      index:true,
      element:<Home/>
    },
    {path:"home",
      element:<Home/>
    },
    {path:"/doctors/:speciality?" ,
      element:<Doctors/>},
      {
        path:"about",
        element:<About/>
      },
      {
        path:"contact",
        element:<Contact/>
      },
      {path:"*",
        element:<Home/>
      },
      {
        path:"form/:formtype?",
        element:<ProtectedAuth><DynamicForm/></ProtectedAuth>
      },
     { path:"form/:formtype?",
      element:<ProtectedAuth><DynamicForm/></ProtectedAuth>
     },
     {path:"my-profile",
      element:<ProtectedRoutesUser><MyProfile/></ProtectedRoutesUser>
     }
,{
  path:"admindashboard",
  element:<ProtectedRoutesAdmin><AdminDashboard/></ProtectedRoutesAdmin>
},
{
  path:"my-account",
  element:<ProtectedRoutesUser><UserAccount/></ProtectedRoutesUser>
},
{path:"/appointment/:doctorId",
  element:<Appointment/>
}
  ]
}])
function App() {
  const queryClient = new QueryClient()

  return (
    <>
     <QueryClientProvider client={queryClient}>
   <RouterProvider router={router}></RouterProvider>
   <ToastContainer/>
   </QueryClientProvider>

    </>
  )
}

export default App
