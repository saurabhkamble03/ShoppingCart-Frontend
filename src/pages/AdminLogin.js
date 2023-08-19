import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/esm/Button'
import login from '../assets/images/adminLoginBg.jpg'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminLogin = () => {

    const navigate = useNavigate()

    const initialValues = {
        username: "",
        password: ""
    }

    const [data, setData] = useState(initialValues)
    const [validations, setValidations] = useState(false)

    const changeHandler = (e) => {
        const newData = { ...data }
        newData[e.target.name] = e.target.value
        setData(newData)
    }

    const submitForm = async (e) => {
        e.preventDefault()

        try {

            if (data.username.length === 0 || data.password.length === 0) {
                setValidations(true)
            }

            const response = await axios.post(`http://localhost:8080/adminLogin`, {
                username: data.username,
                password: data.password
            }
            )

            console.log(response.data)

            if (response.data) {
                navigate('/adminHome')
            }
            else {
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
                console.error('invalid credentials')
            }

        }
        catch (err) {
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
            <Form onSubmit={(e) => submitForm(e)} className='w-25'>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label style={{ color: 'black', fontSize: '25px' }}>Username : </Form.Label>
                    <Form.Control onChange={(e) => changeHandler(e)} type="text" name='username' placeholder="Enter Username" />
                    {validations && data.username <= 0 ? <label style={{ color: 'red', fontWeight: 'bolder' }}>Enter Username</label> : ''}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label style={{ color: 'black', fontSize: '25px' }} >Password : </Form.Label>
                    <Form.Control onChange={(e) => changeHandler(e)} type="password" name='password' placeholder="Enter Password" />
                    {validations && data.password <= 0 ? <label style={{ color: 'red', fontWeight: 'bolder' }}>Enter Password</label> : ''}
                </Form.Group>
                <Button href='/login' className='me-2' variant='info'>Back</Button>
                <Button className='ms-2' variant="warning" type="submit">
                    Submit
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

export default AdminLogin