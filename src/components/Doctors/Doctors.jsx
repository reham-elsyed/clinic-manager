import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { specialityData } from '../../assets/asset'
import { useQuery } from '@tanstack/react-query'
import { DoctorDatabaseContext } from '../../../context/DoctorDatabaseContext'
import { CreateUserDatabaseContext } from '../../../context/UserDbContext'
import { AvailableSlotsContext } from '../../../context/AvailableSlotsContext'
import Loader from '../Loader/Loader'

// Internal component for handling Image with Skeleton
const DoctorImage = ({ src, alt, className }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-gray-200 ${className}`}>
      {/* Skeleton Loader */}
      {!isLoaded && !error && (
        <div className="absolute inset-0 animate-pulse bg-gray-300"></div>
      )}

      {/* Fallback for error */}
      {error ? (
        <div className="flex items-center justify-center h-full w-full bg-gray-100 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
        </div>
      ) : (
        <img
          className={`w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          onError={() => setError(true)}
        />
      )}
    </div>
  );
};

function Doctors() {
  const { speciality } = useParams()
  const navigate = useNavigate()

  const { userRole, deleteUser } = useContext(CreateUserDatabaseContext)
  const [dataDisplay, setDataDisplay] = useState([])
  const { getDoctorsData } = useContext(DoctorDatabaseContext)
  const { deleteAvailableSlots } = useContext(AvailableSlotsContext)
  const { error, data, isLoading } = useQuery({ queryKey: ["doctorAll"], queryFn: helperGetDoctorsData })

  async function helperGetDoctorsData() {
    return await getDoctorsData()
  }

  function filterDoctors(specialdoc) {
    if (specialdoc) {
      // If clicking the same filter again, potentially clear it (optional, but good UX) or just filter
      // Navigate to the route to keep URL in sync or just filter local state?
      // The original code used local state filtering AND route params. 
      // Ideally, clicking a filter should update the URL.
      if (speciality === specialdoc) {
        navigate('/doctors'); // Clear filter
      } else {
        navigate(`/doctors/${specialdoc}`);
      }
    } else {
      navigate('/doctors');
    }
  }

  useEffect(() => {
    if (data) {
      if (speciality) {
        const filteredData = data.filter(doc => doc.speciality === speciality)
        setDataDisplay(filteredData)
      } else {
        setDataDisplay(data)
      }
    }
  }, [speciality, data])

  async function handleDeletDoctor(id) {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      try {
        await deleteUser(id);
        await deleteAvailableSlots(id)
      } catch (err) {
        console.log(err)
      }
    }
  }

  return (
    <div className='container mx-auto px-4 py-8 min-h-screen'>
      {isLoading && <Loader />}

      <h1 className="text-slate-900 text-3xl font-bold mb-8 text-center md:text-left">
        Browse Specialists
      </h1>

      <div className="flex flex-col md:flex-row gap-8">

        {/* Filters Section - Horizontal scroll on mobile, Vertical on Desktop */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div
            role="tablist"
            aria-label="Doctor Specialties"
            className="flex md:flex-col gap-2 overflow-x-auto pb-4 md:pb-0 bg-white p-4 rounded-xl shadow-sm border border-slate-100 sticky top-20"
          >
            <button
              role="tab"
              aria-selected={!speciality}
              className={`btn btn-sm md:btn-md justify-start flex-nowrap whitespace-nowrap ${!speciality ? 'bg-sky-100 text-sky-700 border-sky-200' : 'bg-transparent border-slate-200 hover:bg-slate-50'}`}
              onClick={() => filterDoctors(null)}
            >
              All Specialists
            </button>
            {specialityData.map((spec, index) => (
              <button
                key={index}
                role="tab"
                aria-selected={speciality === spec.speciality}
                className={`btn btn-sm md:btn-md justify-start flex-nowrap whitespace-nowrap ${speciality === spec.speciality ? 'bg-sky-100 text-sky-700 border-sky-200' : 'bg-transparent border-slate-200 hover:bg-slate-50'}`}
                onClick={() => filterDoctors(spec.speciality)}
              >
                {spec.speciality}
              </button>
            ))}
          </div>
        </div>

        {/* Grid Section */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {dataDisplay?.length > 0 ? (
              dataDisplay.map((doctor, index) => (
                <div key={index} className="flex flex-col h-full">
                  <div
                    onClick={() => { navigate(`/appointment/${doctor.id}`) }}
                    className="card bg-white shadow-lg border border-slate-100 hover:shadow-xl hover:shadow-sky-100 transition-all duration-300 cursor-pointer overflow-hidden h-full group"
                  >
                    <figure className="h-48 overflow-hidden bg-slate-100">
                      <DoctorImage
                        src={doctor?.img}
                        alt={`Dr. ${doctor.name}`}
                        className="w-full h-full group-hover:scale-105 transition-transform duration-500"
                      />
                    </figure>
                    <div className="card-body p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        <p className="text-green-500 text-xs font-medium uppercase tracking-wide">Available</p>
                      </div>
                      <h2 className="card-title text-lg font-bold text-slate-800 leading-tight">
                        {doctor.name}
                      </h2>
                      <p className="text-slate-500 text-sm font-medium">
                        {doctor.speciality}
                      </p>
                    </div>
                  </div>

                  {userRole === 'admin' && (
                    <div className='flex justify-center mt-2'>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeletDoctor(doctor.user_id)
                        }}
                        className="btn btn-xs btn-error text-white w-full opacity-80 hover:opacity-100"
                      >
                        Remove Doctor
                      </button>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center text-slate-400">
                <p className="text-lg">No doctors found for this specialty.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Doctors