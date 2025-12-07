import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <>
      {/* Modern Hero Section with Gradient Background */}
      <header
        className="hero min-h-[85vh] bg-gradient-to-br from-sky-50 via-cyan-50 to-blue-100 relative overflow-hidden"
        aria-label="Hero Section"
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute top-20 left-10 w-72 h-72 bg-sky-300/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-300/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '700ms' }}></div>
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1000ms' }}></div>
        </div>

        <div className="hero-content relative z-10 flex-col lg:flex-row-reverse gap-8 px-6 lg:px-12 py-12 max-w-7xl mx-auto w-full">
          {/* Image Section with Modern Styling */}
          <div className="lg:flex-[1.3] relative flex justify-center lg:justify-end w-full">
            <div className="relative group w-full max-w-lg lg:max-w-none">
              <img
                src={`https://firebasestorage.googleapis.com/v0/b/authproject-fbe08.appspot.com/o/files%2Fheader_img.png?alt=media&token=e63b8f05-68e2-43e9-8c5e-79fc866efc70`}
                alt="Diverse team of trusted doctors smiling"
                className="relative z-50 w-full lg:w-[150%] max-w-none transform translate-x-0 lg:-translate-x-24 group-hover:scale-102 transition-transform duration-500 rounded-3xl lg:rounded-none"
                loading="eager"
              />


            </div>
          </div>

          {/* Content Section */}
          <div className="lg:flex-[2.7] space-y-6 relative z-20 text-center lg:text-left">
            {/* Main Heading with Gradient */}
            <div className="space-y-4">
              <div className="inline-block">
                <span className="px-4 py-2 bg-sky-100 text-sky-700 rounded-full text-sm font-semibold border border-sky-200" role="status">
                  🏥 Healthcare Made Easy
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight text-slate-900">
                Book Appointment
                <br className="hidden sm:block" />
                <span className="bg-gradient-to-r from-sky-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent block sm:inline">
                  with Trusted Doctors
                </span>
              </h1>
            </div>

            {/* Description with Profile Images */}
            <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-white/50 shadow-xl">
              <div className="flex flex-col md:flex-row md:items-center gap-6 justify-center lg:justify-start">
                {/* Stacked Profile Images */}
                <div className="flex -space-x-4 justify-center">
                  <img
                    className="w-14 h-14 rounded-full border-4 border-white shadow-lg transform hover:scale-110 hover:z-10 transition-all duration-300 object-cover"
                    src={`https://firebasestorage.googleapis.com/v0/b/authproject-fbe08.appspot.com/o/files%2Fgroup_profiles.png?alt=media&token=b0d577a9-8294-431c-a2d2-b3d98b65cbf1`}
                    alt="Profiles of verified doctors"
                  />
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-sky-500 to-cyan-500 border-4 border-white shadow-lg flex items-center justify-center transform hover:scale-110 hover:z-10 transition-all duration-300">
                    <span className="text-white font-bold text-sm" aria-label="Over 50 more doctors">50+</span>
                  </div>
                </div>

                <div className="flex-1 text-center md:text-left">
                  <p className="text-slate-700 text-lg leading-relaxed">
                    Simply browse through our extensive network of qualified doctors and schedule your appointment with ease.
                  </p>
                  <div className="flex items-center gap-2 mt-3 justify-center md:justify-start">
                    <div className="flex gap-1" aria-label="5 out of 5 stars rating">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20" aria-hidden="true">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-slate-600 font-semibold">4.9/5 from 2,500+ patients</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button with Modern Design */}
            <nav className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start" aria-label="Primary actions">
              <a
                href="#speciality"
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-sky-600 to-cyan-600 rounded-full overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-102 focus:ring-4 focus:ring-sky-300 outline-none"
                aria-label="Book an appointment now"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Book Appointment
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>

              <Link
                to="/doctors"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-sky-700 bg-white/80 backdrop-blur-sm rounded-full border-2 border-sky-200 hover:border-sky-400 hover:bg-white transition-all duration-300 hover:scale-102 focus:ring-4 focus:ring-sky-200 outline-none"
                aria-label="View all available doctors"
              >
                View All Doctors
              </Link>
            </nav>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-4 lg:gap-6 pt-2 justify-center lg:justify-start">
              <div className="flex items-center gap-2 p-2 bg-white/40 rounded-full pr-4 backdrop-blur-sm">
                <div className="w-8 h-8 lg:w-10 lg:h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 lg:h-5 lg:w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm font-semibold text-slate-700">Instant Confirmation</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-white/40 rounded-full pr-4 backdrop-blur-sm">
                <div className="w-8 h-8 lg:w-10 lg:h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 lg:h-5 lg:w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <span className="text-sm font-semibold text-slate-700">100% Secure</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-white/40 rounded-full pr-4 backdrop-blur-sm">
                <div className="w-8 h-8 lg:w-10 lg:h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 lg:h-5 lg:w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-sm font-semibold text-slate-700">24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <style>{`
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </>
  )
}

export default Header