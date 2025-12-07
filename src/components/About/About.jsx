import React from 'react'
import { motion } from 'framer-motion'

function About() {
  const features = [
    {
      title: "Efficiency",
      description: "Streamlined processes ensuring quick turnaround times without compromising quality.",
      delay: 0.2
    },
    {
      title: "Convenience",
      description: "Easy access to all our services with a user-friendly interface designed for you.",
      delay: 0.4
    },
    {
      title: "Personalization",
      description: "Tailored solutions that adapt to your specific needs and preferences.",
      delay: 0.6
    }
  ]

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Decorations */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-sky-200/40 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-200/40 rounded-full blur-3xl opacity-50"></div>
      </div>

      <div className="max-w-7xl mx-auto space-y-20">

        {/* Hero Section */}
        <section className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-sky-400 to-blue-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative h-[400px] lg:h-[500px] w-full overflow-hidden rounded-2xl bg-white shadow-xl">
                <img
                  className="w-full h-full object-cover object-center transform transition duration-700 hover:scale-105"
                  src="https://firebasestorage.googleapis.com/v0/b/authproject-fbe08.appspot.com/o/files%2Fabout_image.png?alt=media&token=88987b4d-9997-4a94-b653-ab3565b8c88d"
                  alt="Medical professionals discussion"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <p className="text-sm font-semibold uppercase tracking-wider text-sky-300 mb-1">Established 2024</p>
                  <h3 className="text-2xl font-bold">Committed to Excellence</h3>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-1/2 flex flex-col justify-center"
          >
            <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-800 mb-6 leading-tight">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600">Us</span>
            </h1>

            <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
              <p>
                We are dedicated to revolutionizing the healthcare experience through innovation and compassion.
                Our team works tirelessly to bridge the gap between advanced technology and human-centric care.
              </p>
              <p>
                Every interaction is designed with your well-being in mind. We believe in transparency,
                quality, and building lasting relationships with our community.
              </p>
            </div>

            <div className="mt-8 p-6 bg-white/60 backdrop-blur-md rounded-2xl border border-white/50 shadow-sm">
              <h2 className="text-xl font-bold text-slate-800 mb-2 flex items-center gap-2">
                <span className="w-8 h-1 bg-sky-500 rounded-full"></span>
                Our Vision
              </h2>
              <p className="text-slate-600 italic">
                "To create a seamless healthcare ecosystem where patient needs are met with precision, empathy, and speed."
              </p>
            </div>
          </motion.div>

        </section>

        {/* Why Choose Us Section */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800">
              Why <span className="font-light text-slate-500">Choose</span> Us?
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-sky-400 to-blue-600 mx-auto mt-4 rounded-full"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: feature.delay }}
                className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-lg border border-slate-100 hover:shadow-sky-100 hover:-translate-y-2 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-sky-50 rounded-2xl flex items-center justify-center mb-6 text-sky-600">
                  {/* You can replace these with actual icons if available, simpler SVG circles for now */}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                  <span className="block mt-4 text-sm text-sky-500 font-medium cursor-pointer hover:underline">Learn more &rarr;</span>
                </p>
              </motion.div>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}

export default About