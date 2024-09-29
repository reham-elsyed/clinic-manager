import React from 'react'

function About() {
  return (
    <div className='container mx-auto px-5'>
      <div className="  card lg:card-side bg-base-100 ">
        <div className="lg:w-1/3 m-2">
        <figure className='bg-slate-500 h-full'>
    <img
    className=" pt-3 self-end"
      src={`https://firebasestorage.googleapis.com/v0/b/authproject-fbe08.appspot.com/o/files%2Fabout_image.png?alt=media&token=88987b4d-9997-4a94-b653-ab3565b8c88d`}
      alt="about us" />
  </figure>
        </div>
 
  <div className="card-body m-2 border-1 border-gray-500 md:w-2/3 shadow-xl">
   <div className='flex'>
   <h2 className="card-title">About us:</h2>
   </div>
    <div className='text-gray-600 text-xl md:text-base sm:text-sm text-start'>
    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequuntur voluptas repellendus ex recusandae. Quibusdam voluptatibus iure dolorem,
       exercitationem suscipit ipsa.</p>
      <p className='mt-3'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error, numquam quas
        . Quidem minima dolore ea.</p>
       
        </div>
    <b className='mt-3'>Our vision</b>
    <p > Lorem ipsum dolor sit amet consectetur adipisicing elit. At, saepe mollitia?
       Nulla tempora beatae porro?</p>
      
  </div>

</div>
<div className='flex card py-10 text-gray-700' >
<h2 className="card-title  text-gray-700"><span className=" font-light">why</span>  choose us?</h2>
<div className='flex p-3'>
<div className="card-body m-2 border-1 shadow-fuchsia-500  shadow-sm">
   <div className='flex'>
   <h2 className="card-title">Efficiency</h2>
   </div>
    <div className='text-gray-600 text-xl md:text-base sm:text-sm text-start'>
    <p>Lorem ipsum dolor sit, recusandae. Quibusdam voluptatibus iure dolorem,
       </p>
      <p className='mt-3'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error, numquam quas
        </p>
       
        </div>
    
  </div>
  <div className="card-body m-2 border-1 shadow-fuchsia-500  shadow-sm">
   <div className='flex'>
   <h2 className="card-title">convenience</h2>
   </div>
    <div className='text-gray-600 text-xl md:text-base sm:text-sm text-start'>
    <p>Lorem ipsum dolor sit, Quibusdam voluptatibus iure dolorem,
      </p>
      <p className='mt-3'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error, numquam quas
        .</p>
       
        </div>
    
      
  </div>
  <div className="card-body m-2 border-1 shadow-fuchsia-500  shadow-sm">
   <div className='flex'>
   <h2 className="card-title">Personalization</h2>
   </div>
    <div className='text-gray-600 text-xl md:text-base sm:text-sm text-start'>
    <p>Lorem ipsum dolor sit, amet consectetur  
       exercitationem suscipit ipsa.</p>
      <p className='mt-3'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error, numquam quas
        </p>  
    </div>   
  </div>
</div>
</div>
    </div>
  )
}

export default About