import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AdminHomeBody = () => {

  const navigate = useNavigate()

  const getAdminSession = async () => {
    const response = await axios.get(`http://localhost:8080/getAdminSession`)
    if (response.data === 0) {
      navigate('/login')
    }
  }

  useEffect(() => {
    getAdminSession()
  }, [])

  return (
    <div style={{ height: '35rem', backgroundColor: 'skyblue' }}>
      <h1 style={{ paddingTop: '5em' }} className='text-center'>WELCOME ADMIN</h1>
    </div>
  )
}

export default AdminHomeBody