import React from 'react'
import Header from '../Header/Header'
 import SpecialityMenu from '../SpecialityMenu/SpecialityMenu'
// import TopDoctors from '../components/TopDoctors'
 import Banner from '../Banner/Banner'

function Home() {
  return (
    <div className="max-w-screen">
      <Header/>
     <SpecialityMenu/>
      {/*  <TopDoctors/>*/}
      <Banner/> 
    </div>
  )
}

export default Home