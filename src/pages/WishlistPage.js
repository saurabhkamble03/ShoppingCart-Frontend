import React from 'react'
import ContactUs from '../components/ContactUs'
import FooterHome from '../components/FooterHome'
import UserNavbar from '../components/UserNavbar'
import WishlistBody from '../components/WishlistBody'

const WishlistPage = () => {
  return (
    <div>
        <UserNavbar/>
        <WishlistBody/>
        <ContactUs/>
        <FooterHome/>
    </div>
  )
}

export default WishlistPage