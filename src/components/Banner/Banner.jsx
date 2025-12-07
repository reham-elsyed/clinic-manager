import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

function Banner() {
  const navigate = useNavigate()

  return (
    <div className='max-w-screen relative'>
      <div className="absolute top-0 left-0 w-full h-full bg-sky-50/50 -z-10"></div>
      <div className="absolute top-20 right-0 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl -z-10"></div>

      <div className='container py-20 px-6 mx-auto relative'>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-indigo-600 to-blue-700 rounded-3xl relative overflow-visible shadow-2xl"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

          <div className="flex flex-col md:flex-row items-center p-8 md:p-14 lg:p-20 relative z-10">
            {/* Content Side */}
            <div className="flex-1 text-left space-y-6 md:pr-10">
              <motion.h2
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight"
              >
                Book Appointment
                <br />
                <span className="text-white/80">With 100+ Trusted Doctors</span>
              </motion.h2>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <button
                  onClick={() => { navigate('/login'); scrollTo(0, 0) }}
                  className="group relative px-8 py-4 bg-white text-indigo-700 font-bold rounded-full text-lg shadow-lg hover:shadow-indigo-500/30 hover:scale-105 transition-all duration-300 overflow-hidden"
                >
                  <span className="relative z-10 group-hover:text-indigo-800 transition-colors">Create Account</span>
                  <div className="absolute inset-0 bg-indigo-50 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                </button>
              </motion.div>
            </div>

            {/* Image Side - Breaking out of container */}
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="hidden md:block absolute bottom-0 right-0 lg:right-10 w-[350px] lg:w-[420px]"
            >
              <img
                className="w-full drop-shadow-2xl"
                src={`https://firebasestorage.googleapis.com/v0/b/authproject-fbe08.appspot.com/o/files%2Fappointment_img.png?alt=media&token=29f0b347-9552-47c6-9e34-e4eb285c6493`}
                alt="Appointment"
                loading="lazy"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Banner