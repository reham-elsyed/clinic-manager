import React from 'react'
import { useEffect } from 'react'
import { NavLink, useLocation, useNavigate , Navigate} from 'react-router-dom'


export default function ProtectedRoutesAdmin(props) {
    const navigate = useNavigate()
    const location = useLocation()
    const currentPathname = window.location.pathname;
   

        if(localStorage.getItem("role") && localStorage.getItem("role") === "admin"){
            console.log(window.location.pathname)
            return props.children
           
          
        }else{
           <Navigate to="/login"/>
    }

}