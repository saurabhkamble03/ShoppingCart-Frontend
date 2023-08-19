import React from 'react'
import { Button } from 'react-bootstrap'
import { ArrowLeft } from 'react-bootstrap-icons'
import login from '../assets/images/login.jpg'

const LoginPage = () => {
  return (
    <div>
      <Button className='ms-3 mt-3' href='/'><ArrowLeft className=' mx-1 my-1'/> Back</Button>
      <div style={{
        height: '90vh',
        backgroundImage: `url(${login})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      }} className='d-flex align-items-center justify-content-center'>
        <Button href='/userLogin' className='mx-2' size='lg'>User Login</Button>
        <Button href='/adminLogin' className='mx-2' variant='success' size='lg'>Admin Login</Button>
      </div>
    </div>
  )
}

export default LoginPage