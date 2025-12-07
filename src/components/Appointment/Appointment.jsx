import React, { useEffect, useState, useContext, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import RelatedDoctors from '../RelatedDoctors/RelatedDoctors'
import { AuthContext } from '../../../context/AuthContext'
import { AppointmentContext } from '../../../context/AppointmentContext'
import { useQuery } from '@tanstack/react-query'
import { DoctorDatabaseContext } from '../../../context/DoctorDatabaseContext'
import { AvailableSlotsContext } from '../../../context/AvailableSlotsContext'
import { DateTime } from 'luxon'
import { useQueryClient } from '@tanstack/react-query';
import 'react-toastify/dist/ReactToastify.css';

import { CreateUserDatabaseContext } from '../../../context/UserDbContext'
import { toast } from 'react-toastify'
import Loader from '../Loader/Loader'
import { motion } from 'framer-motion'

function Appointment() {
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTimeIndex, setSlotTimeIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('');
  const { userRole } = useContext(CreateUserDatabaseContext)
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { currentUser } = useContext(AuthContext);
  const { getDoctorSlots, updateAvailableProperty } = useContext(AvailableSlotsContext)
  const { getDoctorData } = useContext(DoctorDatabaseContext)
  const { addAppointment } = useContext(AppointmentContext)
  const { doctorId } = useParams()

  const { data } = useQuery({
    queryKey: ["doctorAppointmentSlots", doctorId],
    queryFn: () => getDoctorSlots(doctorId),
  });

  const { data: docdata, isLoading: isLoadingDoc } = useQuery({
    queryKey: ["doctorData"],
    queryFn: () => getDoctorData(doctorId),
  });

  useMemo(() => {
    if (!data || !Array.isArray(data)) return new Map();

    const groupedAppointments = data.reduce((acc, appointment) => {
      const date = appointment.date;
      if (!acc.has(date)) acc.set(date, []);
      acc.get(date).push(appointment);
      return acc;
    }, new Map());

    const dailyTimeSlots = Array.from(groupedAppointments.values()).map(appointments => {
      return appointments.map(appointment => ({
        available: appointment.available,
        key: appointment.key,
        doctorId: appointment.doctorId,
        date: DateTime.fromISO(appointment.date).toISODate(),
        startTime: `${(appointment.startTime)} PM`,
        endTime: appointment.endTime
      }));
    });
    setDocSlots(dailyTimeSlots)
  }, [data]);


  async function handleBookingData() {
    if (currentUser && userRole == "user") {
      try {
        const appointment = docSlots[slotIndex][slotTimeIndex]
        const updated_booking = await updateAvailableProperty(appointment);
        if (updated_booking.success) {
          toast.success(updated_booking.message)
        }
        const patientAppoint = { patient_id: currentUser.uid, ...appointment }
        const result = await addAppointment(patientAppoint);
        queryClient.invalidateQueries({ queryKey: ['adminapppointment'] });

        console.log(result);
      } catch (err) {

        toast.error(err)
      }
    }
    else {

      toast.error("not authorized")
      navigate("/login")
    }
  }

  if (isLoadingDoc) return <Loader />

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 md:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {docdata ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col lg:flex-row gap-8"
          >
            {/* Doctor Image Side */}
            <div className="lg:w-1/3">
              <div className="bg-gradient-to-br from-sky-500 to-blue-600 rounded-3xl p-1 shadow-2xl">
                <div className="bg-white rounded-[22px] overflow-hidden h-full flex flex-col items-center pt-6">
                  <img
                    className="w-full max-w-[280px] object-cover drop-shadow-xl"
                    src={docdata?.img}
                    alt={docdata?.name}
                  />
                  <div className="w-full bg-white p-6 border-t border-slate-100">
                    <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                      {docdata?.name}
                      <img
                        title="Verified Doctor"
                        className="w-5 h-5"
                        src={`https://firebasestorage.googleapis.com/v0/b/authproject-fbe08.appspot.com/o/files%2Fverified_icon.svg?alt=media&token=9db092ec-79c6-47f3-8d74-49dd7e257911`}
                        alt="verified"
                      />
                    </h2>
                    <p className="text-sky-600 font-medium mb-2">{docdata?.speciality}</p>
                    <div className="badge badge-outline badge-info border-sky-200 text-sky-700 p-3">{docdata?.experience} Experience</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Details & Booking Side */}
            <div className="lg:w-2/3 space-y-8">
              {/* Info Card */}
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
                <div className="prose max-w-none">
                  <h3 className="text-lg font-bold text-slate-700 flex items-center gap-2 mb-3">
                    About Doctor
                    <span className="text-xs font-normal text-slate-400 bg-slate-100 px-2 py-1 rounded-full border border-slate-200">Bio</span>
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-sm mb-6">{docdata?.about}</p>

                  <div className="flex items-center gap-4 text-slate-700 font-bold bg-sky-50 p-4 rounded-xl border border-sky-100 inline-flex">
                    <span className="text-sky-600">Consultation Fee:</span>
                    <span className="text-lg">${docdata?.fees}</span>
                  </div>
                </div>
              </div>

              {/* Slots Section */}
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
                <h3 className="text-lg font-bold text-slate-700 mb-6 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Available Slots
                </h3>

                {/* Date Slider */}
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-sky-200 scrollbar-track-transparent">
                  {docSlots?.map((week, weekIndex) => (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      key={weekIndex}
                      onClick={() => setSlotIndex(weekIndex)}
                      className={`
                        flex-shrink-0 w-20 py-4 rounded-2xl cursor-pointer text-center border-2 transition-all duration-300
                        ${slotIndex === weekIndex
                          ? 'bg-gradient-to-br from-sky-500 to-blue-600 border-transparent text-white shadow-lg shadow-sky-200'
                          : 'bg-white border-slate-200 text-slate-600 hover:border-sky-300'
                        }
                      `}
                    >
                      <p className="text-xs font-semibold uppercase opacity-80">{DateTime.fromISO(week[0].date).toFormat('EEE')}</p>
                      <p className="text-lg font-bold mt-1">{DateTime.fromISO(week[0].date).toFormat('d')}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Time Grid */}
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 mt-6">
                  {docSlots[slotIndex]?.map((day, dayIndex) => (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: dayIndex * 0.05 }}
                      key={dayIndex}
                      disabled={!day.available}
                      onClick={() => {
                        if (day.available) {
                          setSlotTime(day?.startTime || '')
                          setSlotTimeIndex(dayIndex)
                        }
                      }}
                      className={`
                        w-full py-2 px-1 rounded-xl text-sm font-medium border transition-all duration-200
                        ${!day.available ? 'bg-slate-100 text-slate-300 border-slate-100 cursor-not-allowed line-through' : ''}
                        ${day.available && day?.startTime === slotTime
                          ? 'bg-sky-600 text-white border-sky-600 shadow-md transform scale-105'
                          : day.available ? 'bg-white text-slate-600 border-slate-200 hover:border-sky-400 hover:text-sky-600' : ''
                        }
                      `}
                    >
                      {day?.startTime || 'N/A'}
                    </motion.button>
                  ))}
                </div>

                <div className="mt-10 flex justify-end">
                  <button
                    onClick={() => { handleBookingData() }}
                    disabled={!slotTime}
                    className="btn btn-lg bg-gradient-to-r from-sky-600 to-blue-700 border-none text-white rounded-full px-10 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:shadow-none"
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="h-64 flex items-center justify-center">
            <p className="text-slate-400">Doctor information unavailable.</p>
          </div>
        )}

        <div className="mt-20">
          <RelatedDoctors docId={doctorId} speciality={docdata?.speciality} />
        </div>
      </div>
    </div>
  )
}

export default Appointment