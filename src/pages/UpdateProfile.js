import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import update from '../assets/images/update.jpg'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

const UpdateProfile = () => {

    // const initialValues = {
    //     first_name : "",
    //     last_name : "",
    //     gender : "",
    //     mobile_no: "",
    //     email_id : "",
    //     address : "",
    //     state : "",
    //     city : "",
    //     street : "",
    //     zip_code : ""
    // }

    const location = useLocation()
    const navigate = useNavigate()

    const [data, setData] = useState(location.state.details)
    const [formErrors, setFormErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)

    // console.log(location)

    const changeHandler = (e) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
    }

    const submitHandler = (e) => {
        e.preventDefault()
        setFormErrors(validate(data))
        setIsSubmit(true)
    }

    const updateUser = async (id) => {
        try {
            const response = await axios.put(`http://localhost:8080/updateUser/${id}`, data)
            console.log(response.data)
            console.log('Updated Successfully')
            navigate('/profile')
        }
        catch (error) {
            console.error(error)
        }

    }

    const validate = (values) => {
        const errors = {}

        if(!values.first_name){
            errors.first_name = "First Name is required"
        }

        if(!values.last_name){
            errors.last_name = "Last Name is required"
        }

        if(!values.email_id){
            errors.email_id = "Email Id is required"
        }

        if(!values.mobile_no){
            errors.mobile_no = "Mobile No is required"
        }

        if(!values.address){
            errors.address = "Address is required"
        }

        if(!values.state){
            errors.state = "State is required"
        }

        if(!values.city){
            errors.city = "City is required"
        }

        if(!values.street){
            errors.street = "Street is required"
        }

        if(!values.zip_code){
            errors.zip_code = "Zip Code is required"
        }

        return errors
    }

    useEffect(() => {
        if(Object.keys(formErrors).length === 0 && isSubmit){
            updateUser(location.state.details.user_id)
        }
    },[formErrors])

    return (
        <div style={{
            backgroundImage: `url(${update})`,
            height: 'auto',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
        }}>
            <h3 className='text-center py-4'>Update Profile</h3>
            <Form className='mx-auto mt-4 w-75'>
                <Row className='mb-3'>
                    <Col>
                        <Form.Group>
                            <Form.Label>First Name:</Form.Label>
                            <Form.Control name='first_name' onChange={(e) => changeHandler(e)} type='text' value={data.first_name} placeholder='Enter First Name' />
                            <label style={{color: 'red'}}>{formErrors.first_name}</label>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Last Name:</Form.Label>
                            <Form.Control name='last_name' onChange={(e) => changeHandler(e)} value={data.last_name} type='text' placeholder='Enter Last Name' />
                            <label style={{color: 'red'}}>{formErrors.last_name}</label>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className='mb-3'>
                    <Col>
                        <Form.Group>
                            <Form.Label>Email:</Form.Label>
                            <Form.Control name='email_id' onChange={(e) => changeHandler(e)} value={data.email_id} className='w-50' type='email' placeholder='Enter Email Id' />
                            <label style={{color: 'red'}}>{formErrors.email_id}</label>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Mobile No:</Form.Label>
                            <Form.Control name='mobile_no' onChange={(e) => changeHandler(e)} value={data.mobile_no} type='text' placeholder='Enter Mobile No' />
                            <label style={{color: 'red'}}>{formErrors.mobile_no}</label>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className='mb-3'>
                    <Col>
                        <Form.Group>
                            <Form.Label>Address:</Form.Label>
                            <Form.Control name='address' onChange={(e) => changeHandler(e)} value={data.address} type='text' placeholder='Enter Address' />
                            <label style={{color: 'red'}}>{formErrors.address}</label>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className='mb-3'>
                    <Col>
                        <Form.Group >
                            <Form.Label>State:</Form.Label>
                            <Form.Control name='state' onChange={(e) => changeHandler(e)} value={data.state} type='text' placeholder='Enter State' />
                            <label style={{color: 'red'}}>{formErrors.state}</label>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>City:</Form.Label>
                            <Form.Control name='city' onChange={(e) => changeHandler(e)} value={data.city} type='text' placeholder='Enter City' />
                            <label style={{color: 'red'}}>{formErrors.city}</label>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Street:</Form.Label>
                            <Form.Control name='street' onChange={(e) => changeHandler(e)} value={data.street} type='text' placeholder='Enter Street' />
                            <label style={{color: 'red'}}>{formErrors.street}</label>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className='mb-3'>
                    <Col>
                        <Form.Group>
                            <Form.Label>Zip Code:</Form.Label>
                            <Form.Control name='zip_code' className='w-25' type='text' onChange={(e) => changeHandler(e)} value={data.zip_code} placeholder='Enter Zip Code' />
                            <label style={{color: 'red'}}>{formErrors.zip_code}</label>
                        </Form.Group>
                    </Col>
                </Row>

                <Button href='/profile' variant='success' className='my-3 me-2'>Back</Button>
                <Button onClick={(e) => submitHandler(e)} variant='danger' className='my-3 ms-2'>Update</Button>
            </Form>
        </div>
    )
}

export default UpdateProfile