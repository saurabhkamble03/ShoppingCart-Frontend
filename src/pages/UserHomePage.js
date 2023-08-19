import React from 'react'
import ContactUs from '../components/ContactUs'
import FooterHome from '../components/FooterHome'
import HomeBody from '../components/HomeBody'
import UserNavbar from '../components/UserNavbar'

const UserHomePage = () => {
  return (
    <div>
        <UserNavbar/>
        <HomeBody/>
        <ContactUs/>
        <FooterHome/>
    </div>
  )
}

export default UserHomePage