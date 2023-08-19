import React from 'react'
import AdminHomeBody from '../components/AdminHomeBody'
import AdminNavbar from '../components/AdminNavbar'
import FooterHome from '../components/FooterHome'

const AdminHomePage = () => {
  return (
    <div>
        <AdminNavbar/>
        <AdminHomeBody/>
        <FooterHome/>
    </div>
  )
}

export default AdminHomePage