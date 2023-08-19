import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/esm/Button'
import login from '../assets/images/loginBg.jpg'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserLoginPage = () => {

    const navigate = useNavigate()

    const initialValues = {
        username: '',
        password: ''
    }

    const [data, setData] = useState(initialValues)
    const [validations, setValidations] = useState(false)

    const changeHandler = (e) => {
        const newData = { ...data }
        newData[e.target.name] = e.target.value
        setData(newData)
        // console.log(data)
    }

    const submitForm = async (e) => {
        e.preventDefault()

        try {

            // axios.post(`http://localhost:8080/userLogin`,{
            //     username: data.username,
            //     password: data.password
            // })
            // .then(res => {
            //     console.log(res.data)
            // })
            // .catch(err => {
            //     console.error(err)
            // })

            if (data.username.length === 0 || data.password.length === 0) {
                setValidations(true)
            }

            const response = await axios.post(`http://localhost:8080/userLogin`, {
                username: data.username,
                password: data.password
            }
            )

            console.log(response.data)

            if (response.data) {
                navigate('/userHome')
            }
            else {
                console.error('invalid credentials')
                toast.error('Invalid Credentials', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }

        }
        catch (err) {
            toast.error('Something went wrong!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            console.error(err)
        }
    }

    return (
        <div className='d-flex align-items-center justify-content-center' style={{
            backgroundImage: `url(${login})`,
            height: '100vh',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
        }}>
            <Form onSubmit={(e) => submitForm(e)} style={{}} className='w-25'>
                <Form.Group className="mb-3">
                    <Form.Label style={{ color: 'white', fontSize: '25px' }}>Username : </Form.Label>
                    <Form.Control onChange={(e) => changeHandler(e)} type="text" name='username' placeholder="Enter Username" />
                    {validations && data.username <= 0 ? <label style={{ color: 'orange', fontWeight: 'bolder' }}>Enter Username</label> : ''}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label style={{ color: 'white', fontSize: '25px' }} >Password : </Form.Label>
                    <Form.Control onChange={(e) => changeHandler(e)} type="password" name='password' placeholder="Enter Password" />
                    {validations && data.password <= 0 ? <label style={{ color: 'orange', fontWeight: 'bolder' }}>Enter Password</label> : ''}
                </Form.Group>
                <p style={{ color: 'white', fontWeight: 'bold' }}>Don't have an account? <a style={{ textDecoration: 'none', color: 'yellow' }} href='/userSignUp'>Sign Up</a></p>
                <Button href='/login' className='me-2' variant='info'>Back</Button>
                <Button className='ms-2' variant="warning" type="submit">
                    Login
                </Button>
            </Form>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div >
    )
}

export default UserLoginPage