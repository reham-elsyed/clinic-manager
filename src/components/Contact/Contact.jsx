import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

function Contact() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Decorations */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-sky-200/40 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-blue-200/40 rounded-full blur-3xl opacity-50"></div>
      </div>

      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl lg:text-5xl font-extrabold text-slate-800 mb-4"
          >
            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600">Touch</span>
          </motion.h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "6rem" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-1 bg-gradient-to-r from-sky-400 to-blue-600 mx-auto rounded-full"
          ></motion.div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-stretch">

          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <div className="relative group h-full min-h-[400px]">
              <div className="absolute -inset-1 bg-gradient-to-r from-sky-400 to-blue-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative h-full w-full overflow-hidden rounded-2xl bg-white shadow-xl">
                <img
                  className="w-full h-full object-cover object-center transform transition duration-700 hover:scale-105"
                  src="https://firebasestorage.googleapis.com/v0/b/authproject-fbe08.appspot.com/o/files%2Fcontact_image.png?alt=media&token=1dfffa84-ce38-466b-a12d-18c0b88b4d8b"
                  alt="Contact support"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent"></div>
              </div>
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-1/2 flex flex-col justify-center space-y-8"
          >

            {/* Office Info Card */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-lg border border-slate-100 hover:shadow-sky-100 transition-all duration-300">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                <span className="p-2 bg-sky-100 text-sky-600 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </span>
                Our Office
              </h2>
              <div className="space-y-4 text-slate-600">
                <p>00000 Willms Station <br /> Suite 000, Washington, USA</p>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-700">Tel:</span>
                  <span className="hover:text-sky-600 cursor-pointer transition-colors">(000) 000-0000</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-700">Email:</span>
                  <span className="hover:text-sky-600 cursor-pointer transition-colors">greatstackdev@gmail.com</span>
                </div>
              </div>
            </div>

            {/* Careers Card */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-lg border border-slate-100 hover:shadow-sky-100 transition-all duration-300">
              <h2 className="text-2xl font-bold text-slate-800 mb-4 uppercase tracking-wide">Careers at Prescripto</h2>
              <p className="text-slate-600 mb-6">Learn more about our teams and job openings.</p>
              <button className="px-6 py-2 border-2 border-slate-800 text-slate-800 font-semibold rounded-xl hover:bg-slate-800 hover:text-white transition-all duration-300">
                Explore Jobs
              </button>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <Link
                to="/doctors"
                className="inline-block w-full text-center py-4 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold text-lg shadow-lg hover:shadow-sky-200 hover:scale-[1.02] transform transition-all duration-300"
              >
                Book Appointment
              </Link>
            </div>

          </motion.div>

        </div>
      </div>
    </div>
  )
}

export default Contact