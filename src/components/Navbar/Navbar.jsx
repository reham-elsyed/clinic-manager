import { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../context/AuthContext'
import { CreateUserDatabaseContext } from "../../../context/UserDbContext";
import * as style from "./Navbar.module.css";
function Navbar() {
  const navigate = useNavigate()
  const { userRole } = useContext(CreateUserDatabaseContext)

  const { logout, currentUser } = useContext(AuthContext)
  const [isLoggedIn, setIsLoggedIn] = useState(true)//this should be corrected
  async function loggout() {
    try {
      const log = await logout()
      localStorage.removeItem("role")
      setIsLoggedIn(false)
      navigate("/")
    } catch {
      console.log("log out failed")
    }



  }

  return (
    <>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16" />
              </svg>

            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <NavLink to="/">
                <li className={`p-1 ${style.line} `}>HOME</li>
                <hr className="border-none h-0.5 bg-primary w-3/4 m-auto hidden" />
              </NavLink>
              <NavLink to="/doctors">
                <li className="p-1">ALL DOCTORS</li>
                <hr className="border-none h-0.5 bg-primary w-3/4 m-auto hidden" />
              </NavLink>
              <NavLink to="/about">
                <li className="p-1">ABOUT</li>
                <hr className="border-none h-0.5 bg-primary w-3/4 m-auto hidden" />
              </NavLink>
              <NavLink to="contact">
                <li className="p-1">CONTACT</li>
                <hr className="border-none h-0.5 bg-primary w-3/4 m-auto hidden" />
              </NavLink>
            </ul>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-sky-600">
            CLINIC<span className="text-slate-800">LY</span>
          </h1>

        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <NavLink to="/">
              <li className={`p-1 ${style.line}`}>HOME</li>
            </NavLink>
            <NavLink to="/doctors">
              <li className={`p-1 ${style.line}`}>ALL DOCTORS</li>
              <hr className="border-none h-0.5 bg-primary w-3/4 m-auto hidden focus:block" />
            </NavLink>
            <NavLink to="/about">
              <li className={`p-1 ${style.line}`}>ABOUT</li>
              <hr className="border-none h-0.5 bg-primary w-3/4 m-auto hidden focus:block" />
            </NavLink >
            <NavLink to="/contact">
              <li className={`p-1 ${style.line}`}>CONTACT</li>
              <hr className="border-none h-0.5 bg-primary w-3/4 m-auto hidden focus:block" />
            </NavLink >
          </ul>
        </div>
        <div className="navbar-end">
          {currentUser ?
            <div className="dropdown dropdown-end">
              <div tabIndex={1} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Profile pic"
                    src={`https://firebasestorage.googleapis.com/v0/b/authproject-fbe08.appspot.com/o/files%2Fprofile_pic.png?alt=media&token=806de08d-eb9c-4eb9-8150-2b87b2c93b42`} />
                </div>
              </div>

              <ul
                tabIndex={1}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                {userRole == 'user' ?
                  <>
                    <li>
                      <a onClick={() => { navigate("/my-profile") }} className="justify-between">
                        My Profile
                        <span className="badge">New</span>
                      </a>
                    </li>
                    <li onClick={() => { navigate("/my-account") }}><a >My account</a></li></> : null}
                {userRole == 'admin' ?
                  <li onClick={() => { navigate("/admindashboard") }}><a >My Dashboard</a></li> : null
                }
                <li onClick={() => { loggout() }}><a>Logout</a></li>
              </ul>
            </div> :
            <button
              onClick={() => { navigate("/form/login") }}
              className="btn">Login</button>}
        </div>

      </div>
      <div className="divider m-0"></div>
    </>
  )
}

export default Navbar
