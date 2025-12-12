import { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../context/AuthContext'
import { CreateUserDatabaseContext } from "../../../context/UserDbContext";
import * as style from "./Navbar.module.css";
function Navbar() {
  const navigate = useNavigate()
  const { userRole } = useContext(CreateUserDatabaseContext)

  const { logout, currentUser } = useContext(AuthContext)
  const [isLoggedIn, setIsLoggedIn] = useState(false)//this should be corrected
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
      {/* Modern Navbar with Glassmorphism */}
      <div className="navbar bg-base-100/80 backdrop-blur-xl border-b border-base-300/50 sticky top-0 z-50 shadow-lg">
        <div className="navbar-start">
          {/* Mobile Menu Dropdown */}
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden hover:bg-primary/10 transition-all duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100/95 backdrop-blur-xl rounded-2xl z-[1] mt-4 w-60 p-3 shadow-2xl border border-base-300/50">
              <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
                {({ isActive }) => (
                  <li className={`rounded-xl mb-1 transition-all duration-300 ${isActive ? 'bg-gradient-to-r from-sky-500 to-cyan-500 text-white' : 'hover:bg-primary/10'}`}>
                    <a className="font-semibold py-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      HOME
                    </a>
                  </li>
                )}
              </NavLink>
              <NavLink to="/doctors" className={({ isActive }) => isActive ? 'active' : ''}>
                {({ isActive }) => (
                  <li className={`rounded-xl mb-1 transition-all duration-300 ${isActive ? 'bg-gradient-to-r from-sky-500 to-cyan-500 text-white' : 'hover:bg-primary/10'}`}>
                    <a className="font-semibold py-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      ALL DOCTORS
                    </a>
                  </li>
                )}
              </NavLink>
              <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>
                {({ isActive }) => (
                  <li className={`rounded-xl mb-1 transition-all duration-300 ${isActive ? 'bg-gradient-to-r from-sky-500 to-cyan-500 text-white' : 'hover:bg-primary/10'}`}>
                    <a className="font-semibold py-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      ABOUT
                    </a>
                  </li>
                )}
              </NavLink>
              <NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''}>
                {({ isActive }) => (
                  <li className={`rounded-xl transition-all duration-300 ${isActive ? 'bg-gradient-to-r from-sky-500 to-cyan-500 text-white' : 'hover:bg-primary/10'}`}>
                    <a className="font-semibold py-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      CONTACT
                    </a>
                  </li>
                )}
              </NavLink>
            </ul>
          </div>

          {/* Logo with Gradient */}
          <h1 className="text-4xl font-black tracking-tight bg-gradient-to-r from-sky-500 via-cyan-500 to-blue-600 bg-clip-text text-transparent hover:scale-102 transition-transform duration-300 cursor-pointer ml-2">
            CLINIC<span className="bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">LY</span>
          </h1>
        </div>

        {/* Desktop Menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">
            <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
              {({ isActive }) => (
                <li className={`rounded-xl transition-all duration-300 ${isActive ? 'bg-gradient-to-r from-sky-500 to-cyan-500 text-white shadow-lg shadow-sky-500/50' : 'hover:bg-primary/10'}`}>
                  <a className="font-bold text-sm px-5 py-2.5">HOME</a>
                </li>
              )}
            </NavLink>
            <NavLink to="/doctors" className={({ isActive }) => isActive ? 'active' : ''}>
              {({ isActive }) => (
                <li className={`rounded-xl transition-all duration-300 ${isActive ? 'bg-gradient-to-r from-sky-500 to-cyan-500 text-white shadow-lg shadow-sky-500/50' : 'hover:bg-primary/10'}`}>
                  <a className="font-bold text-sm px-5 py-2.5">ALL DOCTORS</a>
                </li>
              )}
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>
              {({ isActive }) => (
                <li className={`rounded-xl transition-all duration-300 ${isActive ? 'bg-gradient-to-r from-sky-500 to-cyan-500 text-white shadow-lg shadow-sky-500/50' : 'hover:bg-primary/10'}`}>
                  <a className="font-bold text-sm px-5 py-2.5">ABOUT</a>
                </li>
              )}
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''}>
              {({ isActive }) => (
                <li className={`rounded-xl transition-all duration-300 ${isActive ? 'bg-gradient-to-r from-sky-500 to-cyan-500 text-white shadow-lg shadow-sky-500/50' : 'hover:bg-primary/10'}`}>
                  <a className="font-bold text-sm px-5 py-2.5">CONTACT</a>
                </li>
              )}
            </NavLink>
          </ul>
        </div>

        {/* User Profile / Login */}
        <div className="navbar-end">
          {currentUser ?
            <div className="dropdown dropdown-end">
              <div tabIndex={1} role="button" className="btn btn-ghost btn-circle avatar hover:ring-2 hover:ring-primary/20 transition-all duration-300">
                <div className="w-11 rounded-full ring-2 ring-primary/50 ring-offset-2 ring-offset-base-100">
                  <img
                    alt="Profile pic"
                    src={`https://firebasestorage.googleapis.com/v0/b/authproject-fbe08.appspot.com/o/files%2Fprofile_pic.png?alt=media&token=806de08d-eb9c-4eb9-8150-2b87b2c93b42`} />
                </div>
              </div>

              <ul
                tabIndex={1}
                className="menu menu-sm dropdown-content bg-base-100/95 backdrop-blur-xl rounded-2xl z-[1] mt-4 w-64 p-3 shadow-2xl border border-base-300/50">
                {userRole == 'user' ?
                  <>
                    <li className="rounded-xl mb-1 hover:bg-primary/10 transition-all duration-300">
                      <a onClick={() => { navigate("/my-profile") }} className="justify-between font-semibold py-3">
                        <span className="flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          My Profile
                        </span>
                        <span className="badge badge-sm bg-gradient-to-r from-sky-500 to-cyan-500 text-white border-none">New</span>
                      </a>
                    </li>
                    <li onClick={() => { navigate("/my-account") }} className="rounded-xl mb-1 hover:bg-primary/10 transition-all duration-300">
                      <a className="font-semibold py-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        My account
                      </a>
                    </li>
                  </> : null}
                {userRole == 'admin' ?
                  <li onClick={() => { navigate("/admindashboard") }} className="rounded-xl mb-1 hover:bg-primary/10 transition-all duration-300">
                    <a className="font-semibold py-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      My Dashboard
                    </a>
                  </li> : null
                }
                <div className="divider my-1"></div>
                <li onClick={() => { loggout() }} className="rounded-xl hover:bg-error/10 transition-all duration-300">
                  <a className="font-semibold py-3 text-error">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </a>
                </li>
              </ul>
            </div> :
            <button
              onClick={() => { navigate("/form/login") }}
              className="btn btn-primary bg-gradient-to-r from-sky-500 to-cyan-500 border-none text-white font-bold px-8 rounded-full hover:shadow-lg hover:scale-102 transition-all duration-300">
              Login
            </button>}
        </div>
      </div>

      {/* Modern Gradient Divider */}
      <div className="h-1 bg-gradient-to-r from-transparent via-sky-500/30 to-transparent"></div>
    </>
  )
}

export default Navbar
