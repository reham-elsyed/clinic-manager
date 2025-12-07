import React from 'react'
import { specialityData } from '../../assets/asset'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

function SpecialityMenu() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  }

  return (
    <div id='speciality' className='py-16 md:py-24 px-6 relative overflow-hidden'>
      {/* Background decoration matching header theme */}
      <div className="absolute top-0 left-0 w-full h-full bg-sky-50/50 -z-10"></div>
      <div className="absolute top-20 right-0 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto flex flex-col items-center gap-10">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-black text-slate-800">
            Find by <span className="bg-gradient-to-r from-sky-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">Speciality</span>
          </h2>
          <p className="text-slate-600 text-lg">
            Simply browse through our comprehensive list of verified doctors tailored to your specific health needs.
          </p>
        </div>

        {/* Speciality Items Grid/Scroll */}
        <motion.div
          className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 pt-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {specialityData.map((data, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="flex justify-center"
            >
              <Link
                to={`/doctors/${data.speciality}`}
                className="group flex flex-col items-center p-4 bg-white/60 backdrop-blur-sm border border-white/50 rounded-3xl shadow-lg hover:shadow-sky-200/50 hover:border-sky-200 transition-all duration-300 w-full max-w-[160px]"
              >
                <div className="w-20 h-20 mb-4 rounded-full overflow-hidden bg-gradient-to-br from-sky-50 to-blue-50 p-2 group-hover:bg-gradient-to-br group-hover:from-sky-100 group-hover:to-cyan-100 transition-colors duration-300">
                  <img
                    className="w-full h-full object-contain object-center transform group-hover:scale-110 transition-transform duration-500"
                    src={data.image}
                    alt={data.speciality}
                  />
                </div>
                <p className="text-sm font-bold text-slate-700 group-hover:text-sky-600 transition-colors duration-300 text-center">
                  {data.speciality}
                </p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default SpecialityMenu