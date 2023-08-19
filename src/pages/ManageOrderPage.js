import React from 'react'
import AdminNavbar from '../components/AdminNavbar'
import FooterHome from '../components/FooterHome'
import ManageOrderBody from '../components/ManageOrderBody'

const ManageOrderPage = () => {
  return (
    <div>
        <AdminNavbar/>
        <ManageOrderBody/>
        <FooterHome/>
    </div>
  )
}

export default ManageOrderPage