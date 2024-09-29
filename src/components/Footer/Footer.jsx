import React from 'react'
import { NavLink } from 'react-router-dom'
//import useScrollToTop from '../components/ScrollTopHook';


 function Footer() {
//  let scroll= useScrollToTop();
//  useScrollToTop();
  return (
    <div>
        <footer className="footer  bg-base-200 text-base-content p-10">
  <aside>
   <img src={`https://firebasestorage.googleapis.com/v0/b/authproject-fbe08.appspot.com/o/files%2Flogo.svg?alt=media&token=22d9dbc2-8c2e-46e1-b237-092f5afe15ed`} alt="logo" />
    <p>
      ACME Industries Ltd.
      <br />
      Providing reliable tech since 1992
    </p>
  </aside>
  <nav>
    <h6 className="footer-title">Services</h6>
    <NavLink to="/" className="link link-hover">Home</NavLink>
    <NavLink to="/contact" className="link link-hover">Contact</NavLink>
    <NavLink to="/about" className="link link-hover">About</NavLink>
    <NavLink className="link link-hover">Privacy Policy</NavLink>
  </nav>
  <nav>
    <h6 className="footer-title">Get In Touch</h6>
    <a className="link link-hover">010 548855952</a>
    <a className="link link-hover">email@example.com</a>
   
  </nav>
 
</footer>
    </div>
  )
}

export default Footer