
import './App.css'
import Home from './components/Home/Home'
// import Doctors from './components/'
// import Login from './'
import Layout from './components/Layout/Layout'
import About from './components/About/About'
import Contact from './components/Contact/Contact'
// import MyProfile from './pages/MyProfile'
// import MyAppointment from './pages/MyAppointment'
// import Appointment from './pages/Appointment'
// import Navbar from './components/Navbar'
// import Footer from './components/Footer'
// import AdminDashboard from './pages/AdminDashboard'
// import Signup from './pages/Signup'
// import UserProtectedRoutes from '../context/UserProtectedRoute'
// import AdminProtectedRoutes from '../context/AdminProtectedRoute'
// import AddDoctorDashboard from './components/AddDoctorDashboard'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

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
    // {path:"/doctors/:speciality?" ,
    //   element:<Doctors/>},
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
      }

  ]
}])
function App() {
  const queryClient = new QueryClient()

  return (
    <>
     <QueryClientProvider client={queryClient}>
   <RouterProvider router={router}></RouterProvider>
   </QueryClientProvider>
   
    </>
  )
}

export default App
