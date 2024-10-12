import React, { useContext } from 'react'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../context/AuthContext'
import { CreateUserDatabaseContext } from '../../../context/UserDbContext'
import 'react-toastify/dist/ReactToastify.css';

import { toast } from 'react-toastify'


function Login() {
  const {login} = useContext(AuthContext)
  const {getData}= useContext(CreateUserDatabaseContext)
  const navigate = useNavigate()
  async function handleLogin(formValues){
    try{
      const loginInfo = await login(formValues)
      if(loginInfo){
        await getData(loginInfo)
        console.log(loginInfo,"login info")
        toast.success("log in success")
       navigate("/")
      }
    }catch(err){
      toast.error("something went wrong")
      console.log(err,"login error")
    }
  }
  let formik = useFormik({
    initialValues:{
      email:"",
      password:"",
      name:""
    },
    onSubmit:handleLogin,
  })
  return (
    <div className=" px-5 py-4 flex justify-center items-center flex-col ">
      <div className=" text-start flex justify-center items-center flex-col   border-2 p-3  w-2/3 lg:w-3/4 xl:w-1/2  input-bordered">
<h2>login now</h2>
<form className='w-full'  onSubmit={formik.handleSubmit}> 
<div className="w-full form-control">
  <label htmlFor="name" className="label ">
    Name
  </label>
  <input
    id="name"
    name="name"
    type="text"
    placeholder="Type here"
    className="input  input-secondary   focus:outline-none w-full"
 onChange={formik.handleChange}
 onBlur={formik.handleBlur}
 value={formik.values.name}
 />
</div>
<div className="">
  <label htmlFor="email" className="label ">
   email
  </label>
  <input
    id="email"
    name="email"
    type="email"
    placeholder="Type here"
    className="input input-bordered input-secondary  focus:outline-none w-full "
 onChange={formik.handleChange}
 onBlur={formik.handleBlur}
 value={formik.values.email}
 />
</div>
<div className="form-control">
  <label htmlFor="password" className="label ">
    password
  </label>
  <input
    id="password"
    name="password"
    type="password"
    placeholder="password"
    className="input input-bordered input-secondary  focus:outline-none w-full "
 onChange={formik.handleChange}
 onBlur={formik.handleBlur}
 value={formik.values.password}
 />
</div>
<div className="card-actions pt-5">
      <button  className="btn btn-primary">Login</button>
    </div>
</form>
<div className="divider m-0"></div>
<div className="card-actions pt-5">
  <p>don't have an account ?</p>
      <button onClick={()=>{navigate('/signup')}} className="btn btn-primary">Sign Up</button>
    </div>
</div>
    </div>
  )
}

export default Login