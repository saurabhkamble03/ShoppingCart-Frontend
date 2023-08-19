import React from 'react'
import ContactUs from '../components/ContactUs'
import FooterHome from '../components/FooterHome'
import MyOrdersBody from '../components/MyOrdersBody'
import UserNavbar from '../components/UserNavbar'

const MyOrdersPage = () => {
    return (
        <div>
            <UserNavbar />
            <MyOrdersBody/>
            <ContactUs />
            <FooterHome />
        </div>
    )
}

export default MyOrdersPage