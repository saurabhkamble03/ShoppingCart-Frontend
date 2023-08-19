import React from 'react'
import ContactUs from '../components/ContactUs'
import FooterHome from '../components/FooterHome'
import MyCartBody from '../components/MyCartBody'
import UserNavbar from '../components/UserNavbar'

const MyCart = () => {
  return (
    <div>
        <UserNavbar/>
        <MyCartBody/>
        <ContactUs/>
        <FooterHome/>
    </div>
  )
}

export default MyCart