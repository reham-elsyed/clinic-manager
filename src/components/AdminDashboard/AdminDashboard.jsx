import React from 'react'
import AddDoctorDashboard from '../AddDoctorData/AddDoctorData'
import { useNavigate, Outlet, useParams } from 'react-router-dom'
import { useState } from 'react'
import Doctors from '../Doctors/Doctors'
import AdminDashAppointments from '../AdminDashboardAppointments/AdminDashboardAppointments'
function AdminDashboard() {
  const [mainData, setMainData]= useState("")
  const navigate = useNavigate()
  const params = useParams()
  return (
    <div className="flex ">
<div className='w-1/3 md:w-1/4 lg:w-1/5'>
<div role="tablist" className="flex flex-col gap-2 bg-white tabs-boxed">
        
          <p role="tab" className="btn bg-fuchsia-100" onClick={() => {setMainData("add-doctor")}}>Add doctor</p>
          <p role="tab" className="btn bg-fuchsia-100" onClick={() => {setMainData("appointments")}}>Appointments</p>
          <p role="tab" className="btn bg-fuchsia-100" onClick={() => {setMainData("doctors-list")}}>Doctors List</p>

        </div>

</div >
<div className="w-2/3 md:w-3/4 ld:w-4/5">
    {mainData === "add-doctor"?<AddDoctorDashboard/>:null}
    {mainData === "appointments"?<AdminDashAppointments/>:null}
    {mainData === 'doctors-list'?<Doctors/>:null}
    </div>
    

    </div>
  )
}

export default AdminDashboard