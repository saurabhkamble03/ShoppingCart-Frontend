import React from 'react'
import ContactUs from '../components/ContactUs'
import FooterHome from '../components/FooterHome'
import HomeBody from '../components/HomeBody'
import NavbarHome from '../components/NavbarHome'

const HomePage = () => {
  return (
    <div>
      <NavbarHome />
      <HomeBody/>
      <ContactUs/>
      <FooterHome />
    </div>
  )
}

export default HomePage