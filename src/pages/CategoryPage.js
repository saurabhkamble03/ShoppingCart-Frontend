import React from 'react'
import CategoryBody from '../components/CategoryBody'
import ContactUs from '../components/ContactUs'
import FooterHome from '../components/FooterHome'
import UserNavbar from '../components/UserNavbar'

const CategoryPage = () => {
  return (
    <div>
        <UserNavbar/>
        <CategoryBody/>
        <ContactUs/>
        <FooterHome/>
    </div>
  )
}

export default CategoryPage