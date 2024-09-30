import { useContext, useState ,useEffect} from 'react'
import { useFormik } from 'formik'
import {DoctorDatabaseContext} from '../../../context/DoctorDatabaseContext'
import { AvailableSlotsContext } from '../../../context/AvailableSlotsContext'
import { imagestorage } from '../../../firebase'
import {ref, uploadBytes, getDownloadURL} from'firebase/storage'
import { v4 } from 'uuid'
//import {alldoctors} from '../assets/assets/assets_frontend/assets'
function AddDoctorDashboard() {
  const [img, setImg] =useState()
    const {addDoctorAndCreateAccount}= useContext(DoctorDatabaseContext)
    const {saveDoctorSchedule} = useContext(AvailableSlotsContext)
  
    const handleImageUpload = async() => {
      const imgRef = ref(imagestorage, `files/${v4()}`)
      const snapshot= await uploadBytes(imgRef, img)
      console.log(await snapshot.ref)
     const download= await getDownloadURL(snapshot.ref);   
     return download
     };
   
  
    async function handleRegister(formValues){
    const id = generateUUID()
    const downloadURL = await handleImageUpload()
    const values ={...formValues, user_id:id, img:downloadURL}
    await addDoctorAndCreateAccount(values)
    await saveDoctorSchedule(id)

console.log(values)
  }
async function createDBD(){
  // alldoctors.map(async (doctor) =>{
    const doctor = alldoctors[0]
    const id = generateUUID()
    const downloadURL = await handleImageUpload(doctor.image)
    const doctordata = {... doctor, user_id:id, image:downloadURL}
    console.log(doctordata)
   
    
    await addDoctorAndCreateAccount(doctordata)
    await saveDoctorSchedule(id)

  // })

}

// useEffect(()=>{
// createDBD()
 
// },[])
  let formik = useFormik({
    initialValues:{
    
        name: '',
        email:'',
        speciality: '',
        degree: '',
        experience: '',
        about: '',
        fees: 0,
        address: {
            line1: '',
            line2: ''
        },
        role:"doctor",
       
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await handleRegister(values);
        setSubmitting(false);
      } catch (error) {
        console.error('Registration failed:', error);
        // Handle error appropriately (e.g., show error message to user)
      }
    },
  })

 

  function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }


  return (
    <div className=" px-2 py-4 flex justify-center items-center flex-col ">
      <div className=" text-start flex justify-center  flex-col   border-2 p-3  input-bordered">
<h2 className="text-md md:text-xl lg:text-3xl">Add Doctor</h2>
<form className='w-full  '  onSubmit={formik.handleSubmit}> 
    <div className='w-full flex flex-col md:flex-row justify-between gap-1'>
    <div>
    <div className=" form-control">
  <label htmlFor="name" className="label ">
   Doctor Name
  </label>
  <input
    id="name"
    name="name"
    type="text"
    placeholder="Type here"
    className="input  input-secondary   focus:outline-none w-full"
 onChange={formik.handleChange}
 onBlur={formik.handleBlur}
 value={formik.values.name}
 />
</div>
<div className="form-control">
  <label htmlFor="email" className="label ">
   email
  </label>
  <input
    id="email"
    name="email"
    type="email"
    placeholder="Type here"
    className="input input-bordered input-secondary  focus:outline-none w-full "
 onChange={formik.handleChange}
 onBlur={formik.handleBlur}
 value={formik.values.email}
 />
</div>
<div className="form-control">
  <label htmlFor="password" className="label ">
    password
  </label>
  <input
    id="password"
    name="password"
    type="password"
    placeholder="password"
    className="input input-bordered input-secondary  focus:outline-none w-full "
 onChange={formik.handleChange}
 onBlur={formik.handleBlur}
 value={formik.values.password}
 />
</div>
<div className="form-control">
  <label htmlFor="experience" className="label ">
    experience
  </label>
  <input
    id="experience"
    name="experience"
    type="text"
    placeholder="experience"
    className="input input-bordered input-secondary  focus:outline-none w-full "
 onChange={formik.handleChange}
 onBlur={formik.handleBlur}
 value={formik.values.experience}
 />
</div>
<div className="form-control">
  <label htmlFor="degree" className="label ">
    Degree
  </label>
  <input
    id="degree"
    name="degree"
    type="text"
    placeholder="degree"
    className="input input-bordered input-secondary  focus:outline-none w-full "
 onChange={formik.handleChange}
 onBlur={formik.handleBlur}
 value={formik.values.degree}
 />
</div>
<div className="form-control">
  <label htmlFor="about" className="label ">
   About doctor
  </label>
  <textarea
    id="about"
    name="about"
    type="text"
    placeholder="about doctor"
    className="textarea  textarea-secondary  focus:outline-none w-full "
 onChange={formik.handleChange}
 onBlur={formik.handleBlur}
 value={formik.values.about}>
 </textarea>
</div>


    </div>
    <div>
    <div className="form-control">
  <label htmlFor="fees"
   className="label ">
   fees
  </label>
  <input
    id="fees"
    name="fees"
    type="text"
    placeholder="fees"
    className="input input-bordered input-secondary  focus:outline-none w-full "
 onChange={formik.handleChange}
 onBlur={formik.handleBlur}
 value={formik.values.fees}
 />
</div>

<div className="form-control">
  <label htmlFor="speciality" className="label ">
    speciality
  </label>
  <input
    id="speciality"
    name="speciality"
    type="text"
    placeholder="speciality"
    className="input input-bordered input-secondary  focus:outline-none w-full "
 onChange={formik.handleChange}
 onBlur={formik.handleBlur}
 value={formik.values.speciality}
 />
</div>

<div className="form-control">
  <label htmlFor="education" className="label ">
    education
  </label>
  <input
    id="education"
    name="education"
    type="text"
    placeholder="education"
    className="input input-bordered input-secondary  focus:outline-none w-full "
 onChange={formik.handleChange}
 onBlur={formik.handleBlur}
 value={formik.values.education}
 />
</div>

<div className="form-control">
  <label htmlFor="address1" className="label ">address
  </label>
  <input
    id="address1"
    name="address.line1"
    type="text"
    placeholder="address"
    className="input input-bordered input-secondary  focus:outline-none w-full "
 onChange={formik.handleChange}
 onBlur={formik.handleBlur}
 value={formik.values.address ? formik.values.address.line1 : ''}
 />
 <label htmlFor="address2" className="label ">
  </label>
  
  <input
    id="address2"
    name="address.line2"
    type="text"
    placeholder="address"
    className="input input-bordered input-secondary  focus:outline-none w-full mt-2 "
 onChange={formik.handleChange}
 onBlur={formik.handleBlur}
 value={formik.values.address ? formik.values.address.line2 : ''}
 />
</div>
<div className="form-control">
  <label htmlFor="image"
   className="label ">
   Add Image
  </label>
  <input
    id="image"
    name="image"
    type="file"
    accept=".png,.jpg,.jpeg,.gif"

    placeholder="image.png"
    className="input input-bordered input-secondary  focus:outline-none w-full "
    onChange={(e) => {setImg(e.target.files[0])}}
 onBlur={formik.handleBlur}
 />
</div>

    </div>
    </div>
 



<div className="card-actions pt-5">
      <button  className="btn btn-primary">Add Doctor</button>
    </div>
</form>



<div className="divider m-0"></div>

</div>
    </div>
  )
}

export default AddDoctorDashboard