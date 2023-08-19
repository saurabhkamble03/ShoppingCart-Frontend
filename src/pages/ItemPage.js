import React from 'react'
import ContactUs from '../components/ContactUs'
import FooterHome from '../components/FooterHome'
import ItemBody from '../components/ItemBody'
import UserNavbar from '../components/UserNavbar'

const ItemPage = () => {
  return (
    <div>
        <UserNavbar/>
        <ItemBody/>
        <ContactUs/>
        <FooterHome/>
    </div>
  )
}

export default ItemPage