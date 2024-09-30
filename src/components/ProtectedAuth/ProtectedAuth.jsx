import React from 'react'
import { useEffect } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'


export default function ProtectedAuth(props) {
    const navigate = useNavigate()
    const location = useLocation()
    const currentPathname = window.location.pathname;
    useEffect(()=>{

        if(localStorage.getItem("role")){
            console.log(window.location.pathname)
        
           
          return  navigate("/")
        
       
    }
},[])

return props.children 

 
}