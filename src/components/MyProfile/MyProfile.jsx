import React, { useContext, useState } from 'react'
import { CreateUserDatabaseContext } from '../../../context/UserDbContext'
import { toast } from 'react-toastify'
import { useEffect } from 'react';

function MyProfile() {
  const { addUserData, getData } = useContext(CreateUserDatabaseContext);
  const [userData, setUserData] = useState({
    name: "Edward Vincent",
    image: "https://firebasestorage.googleapis.com/v0/b/authproject-fbe08.appspot.com/o/files%2Fprofile_placeholder.png?alt=media&token=d09b68a8-6447-4869-93f4-7935f111059f",
    email: "richardjameswap@gmail.com",
    phone: "+1 123 456 7890",
    address: {
      line1: "57th Cross, Richmond",
      line2: "Circle, Church Road, London"
    },
    gender: "Male",
    dob: "2000-01-20"
  })

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem("user_id")
      const data = await getData(userId)
      console.log(data, "data profile")
      if (data) {
        setUserData(prev => ({ ...prev, ...data }))
      }
    }
    fetchUserData()
  }, [])

  const [isEdit, setIsEdit] = useState(false)

  const handleSave = async () => {
    try {
      await addUserData(userData);
      setIsEdit(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile.");
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 flex justify-center">
      <div className="w-full max-w-lg bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-slate-100 p-8 relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-sky-500 to-blue-600 opacity-90 -z-10"></div>
        <div className="absolute top-20 right-10 w-32 h-32 bg-white/20 rounded-full blur-2xl -z-10"></div>

        {/* Profile Image & Name */}
        <div className="flex flex-col items-center -mt-4 mb-6 relative">
          <div className="relative group">
            <img
              className="w-32 h-32 rounded-2xl object-cover border-4 border-white shadow-lg bg-white"
              src={userData.image || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"}
              alt="Profile"
            />
            {isEdit && (
              <div className="absolute inset-0 bg-black/40 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <span className="text-white font-medium text-sm">Change</span>
              </div>
            )}
          </div>

          {isEdit ? (
            <input
              className="mt-4 text-2xl font-bold text-slate-800 text-center bg-transparent border-b-2 border-sky-500 outline-none focus:border-blue-600 transition-colors"
              type="text"
              value={userData.name}
              onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))}
            />
          ) : (
            <h2 className="mt-4 text-2xl font-bold text-slate-800">{userData.name}</h2>
          )}
        </div>

        <div className="border-t border-slate-100 pt-6 space-y-6">
          {/* Contact Info */}
          <div>
            <h3 className="text-slate-400 text-sm font-bold uppercase tracking-wide mb-4">Contact Information</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                <span className="text-slate-600 font-medium">Email:</span>
                <span className="text-sky-600 truncate">{userData.email}</span>
              </div>

              <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                <span className="text-slate-600 font-medium">Phone:</span>
                {isEdit ? (
                  <input
                    className="w-full bg-slate-50 px-3 py-1 rounded-lg border border-slate-200 outline-none focus:border-sky-500 transition-all"
                    type="text"
                    value={userData.phone}
                    onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))}
                  />
                ) : (
                  <span className="text-slate-800">{userData.phone}</span>
                )}
              </div>

              <div className="grid grid-cols-[100px_1fr] items-start gap-4">
                <span className="text-slate-600 font-medium pt-1">Address:</span>
                {isEdit ? (
                  <div className="space-y-2">
                    <input
                      className="w-full bg-slate-50 px-3 py-1 rounded-lg border border-slate-200 outline-none focus:border-sky-500 transition-all font-light"
                      type="text"
                      value={userData.address.line1}
                      onChange={e => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))}
                    />
                    <input
                      className="w-full bg-slate-50 px-3 py-1 rounded-lg border border-slate-200 outline-none focus:border-sky-500 transition-all font-light"
                      type="text"
                      value={userData.address.line2}
                      onChange={e => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))}
                    />
                  </div>
                ) : (
                  <p className="text-slate-800 leading-relaxed">
                    {userData.address.line1}<br />
                    {userData.address.line2}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Basic Info */}
          <div>
            <h3 className="text-slate-400 text-sm font-bold uppercase tracking-wide mb-4">Basic Information</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                <span className="text-slate-600 font-medium">Gender:</span>
                {isEdit ? (
                  <select
                    className="w-full bg-slate-50 px-3 py-1 rounded-lg border border-slate-200 outline-none focus:border-sky-500 transition-all"
                    value={userData.gender}
                    onChange={e => setUserData(prev => ({ ...prev, gender: e.target.value }))}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                ) : (
                  <span className="text-slate-800">{userData.gender}</span>
                )}
              </div>

              <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                <span className="text-slate-600 font-medium">Birthday:</span>
                {isEdit ? (
                  <input
                    className="w-full bg-slate-50 px-3 py-1 rounded-lg border border-slate-200 outline-none focus:border-sky-500 transition-all"
                    type="date"
                    value={userData.dob}
                    onChange={e => setUserData(prev => ({ ...prev, dob: e.target.value }))}
                  />
                ) : (
                  <span className="text-slate-800">{userData.dob}</span>
                )}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-6">
            {isEdit ? (
              <button
                onClick={handleSave}
                className="btn w-full bg-gradient-to-r from-sky-600 to-blue-600 text-white border-none rounded-xl shadow-lg hover:shadow-sky-100 hover:scale-[1.02] transition-all normal-case text-lg"
              >
                Save Information
              </button>
            ) : (
              <button
                onClick={() => setIsEdit(true)}
                className="btn w-full btn-outline border-sky-600 text-sky-600 hover:bg-sky-50 hover:border-sky-600 rounded-xl normal-case text-lg"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyProfile