import React from 'react'
import ContactUs from '../components/ContactUs'
import FooterHome from '../components/FooterHome'
import ProfileBody from '../components/ProfileBody'
import UserNavbar from '../components/UserNavbar'

const ProfilePage = () => {
  return (
    <div>
        <UserNavbar/>
        <ProfileBody/>
        <ContactUs/>
        <FooterHome/>
    </div>
  )
}

export default ProfilePage