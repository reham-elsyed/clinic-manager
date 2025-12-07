import React, { useContext, useState } from 'react'
import { useFormik } from 'formik'
import { DoctorDatabaseContext } from '../../../context/DoctorDatabaseContext'
import { AvailableSlotsContext } from '../../../context/AvailableSlotsContext'
import { imagestorage } from '../../../firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { v4 } from 'uuid'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'

// Reusable Input Component
const FormInput = ({ label, name, type = "text", placeholder, formik, className = "" }) => {
  const isError = formik.touched[name] && formik.errors[name];

  return (
    <div className={`form-control w-full ${className}`}>
      <label htmlFor={name} className="label">
        <span className="label-text font-semibold text-slate-600">{label}</span>
      </label>
      {type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          placeholder={placeholder}
          className={`textarea textarea-bordered h-24 bg-white/50 focus:bg-white text-slate-800 focus:outline-none focus:border-sky-500 transition-all duration-300 ${isError ? 'border-red-500' : 'border-slate-300'}`}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values[name]}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          className={`input input-bordered w-full bg-white/50 focus:bg-white text-slate-800 focus:outline-none focus:border-sky-500 transition-all duration-300 ${isError ? 'border-red-500' : 'border-slate-300'}`}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values[name]}
        />
      )}
      {isError && (
        <label className="label">
          <span className="label-text-alt text-red-500">{formik.errors[name]}</span>
        </label>
      )}
    </div>
  );
};

function AddDoctorDashboard() {
  const [img, setImg] = useState(null)
  const { addDoctorAndCreateAccount } = useContext(DoctorDatabaseContext)
  const { saveDoctorSchedule } = useContext(AvailableSlotsContext)
  const [loading, setLoading] = useState(false)

  const handleImageUpload = async () => {
    if (!img) return null;
    const imgRef = ref(imagestorage, `files/${v4()}`)
    const snapshot = await uploadBytes(imgRef, img)
    const download = await getDownloadURL(snapshot.ref);
    return download
  };

  async function handleRegister(formValues) {
    setLoading(true);
    try {
      const id = generateUUID()
      const downloadURL = await handleImageUpload()

      const values = {
        ...formValues,
        user_id: id,
        img: downloadURL || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png" // Fallback image
      }

      await addDoctorAndCreateAccount(values)
      await saveDoctorSchedule(id)
      toast.success("Doctor added successfully!")
      formik.resetForm();
      setImg(null);
    } catch (err) {
      console.error(err)
      toast.error("Failed to add doctor. Please try again.")
    } finally {
      setLoading(false);
    }
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      speciality: '',
      degree: '',
      experience: '',
      about: '',
      fees: '',
      education: '',
      address: {
        line1: '',
        line2: ''
      },
      role: "doctor",
    },
    // Simple validation could be added here with yup
    onSubmit: async (values) => {
      await handleRegister(values);
    },
  })

  function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  // Configuration for form fields
  const textFields = [
    { label: "Doctor Name", name: "name", placeholder: "e.g. Dr. John Doe" },
    { label: "Email", name: "email", type: "email", placeholder: "doctor@example.com" },
    { label: "Password", name: "password", type: "password", placeholder: "Strong password" },
    { label: "Speciality", name: "speciality", placeholder: "e.g. Cardiologist" },
    { label: "Degree", name: "degree", placeholder: "e.g. MBBS, MD" },
    { label: "Experience", name: "experience", placeholder: "e.g. 5 Years" },
    { label: "Fees ($)", name: "fees", type: "number", placeholder: "e.g. 50" },
    { label: "Education", name: "education", placeholder: "e.g. Harvard Medical School" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 flex justify-center items-start">

      {/* Background Decorations */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-5%] left-[-5%] w-96 h-96 bg-purple-200/40 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-[-5%] right-[-5%] w-96 h-96 bg-sky-200/40 rounded-full blur-3xl opacity-50"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-slate-100 p-8"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-slate-800">Add New Doctor</h2>
          <p className="text-slate-500 mt-2">Create a new doctor profile and access account.</p>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Map through simple text fields */}
            {textFields.map((field, index) => (
              <FormInput
                key={index}
                formik={formik}
                {...field}
              />
            ))}
          </div>

          {/* Address Section */}
          <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
            <h3 className="text-lg font-semibold text-slate-700 mb-4">Address Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control w-full">
                <label htmlFor="address.line1" className="label">
                  <span className="label-text font-semibold text-slate-600">Line 1</span>
                </label>
                <input
                  id="address.line1"
                  name="address.line1"
                  type="text"
                  placeholder="Street address"
                  className="input input-bordered w-full bg-white/50 focus:bg-white focus:border-sky-500"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.address.line1}
                />
              </div>
              <div className="form-control w-full">
                <label htmlFor="address.line2" className="label">
                  <span className="label-text font-semibold text-slate-600">Line 2</span>
                </label>
                <input
                  id="address.line2"
                  name="address.line2"
                  type="text"
                  placeholder="Apartment, suite, etc."
                  className="input input-bordered w-full bg-white/50 focus:bg-white focus:border-sky-500"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.address.line2}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* About Section */}
            <FormInput
              formik={formik}
              name="about"
              label="About Doctor"
              type="textarea"
              placeholder="Write a brief biography..."
              className="md:col-span-2"
            />

            {/* Image Upload */}
            <div className="form-control w-full md:col-span-2">
              <label className="label">
                <span className="label-text font-semibold text-slate-600">Profile Image</span>
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  accept=".png,.jpg,.jpeg,.gif"
                  className="file-input file-input-bordered file-input-primary w-full max-w-xs bg-white/50 focus:bg-white"
                  onChange={(e) => setImg(e.target.files[0])}
                />
                {img && (
                  <span className="text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-200">
                    {img.name} selected
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="divider"></div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className={`btn btn-lg bg-gradient-to-r from-sky-500 to-blue-600 border-none text-white shadow-lg hover:shadow-sky-200 hover:scale-[1.02] transition-all rounded-xl px-10 ${loading ? 'loading' : ''}`}
            >
              {loading ? 'Adding Doctor...' : 'Add Doctor'}
            </button>
          </div>

        </form>
      </motion.div>
    </div>
  )
}

export default AddDoctorDashboard