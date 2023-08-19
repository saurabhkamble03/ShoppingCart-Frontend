import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import sign from '../assets/images/signup.jpg'
import './Style.css';

const UserSignUpPage = () => {

    const navigate = useNavigate()

    const intialValues = {
        first_name: '',
        last_name: '',
        username: '',
        email_id: '',
        gender: '',
        mobile_no: '',
        address: '',
        state: '',
        city: '',
        street: '',
        zip_code: '',
        password: '',
    }

    const [data, setData] = useState(intialValues)
    const [formErrors, setFormErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)

    const changeHandler = (e) => {
        const newData = { ...data }
        newData[e.target.name] = e.target.value
        setData(newData)
    }

    const userData = {
        first_name: data.first_name,
        last_name: data.last_name,
        username: data.username,
        email_id: data.email_id,
        gender: data.gender,
        mobile_no: data.mobile_no,
        address: data.address,
        state: data.state,
        city: data.city,
        street: data.street,
        zip_code: data.zip_code,
        password: data.password
    }

    const clickHandler = async (e) => {
        e.preventDefault()
        setFormErrors(validate(data))
        setIsSubmit(true)
        console.log(formErrors.length)
        console.log(formErrors)
        console.log("isSubmit ", isSubmit)
    }

    const registerUser = async () => {
        try {
            const response = await axios.post(`http://localhost:8080/addUser`, userData)
            console.log(response.data)
            navigate('/userLogin')
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

        if(!values.username){
            errors.username = "Username is required"
        }

        if(!values.email_id){
            errors.email_id = "Email Id is required"
        }

        if(!values.gender){
            errors.gender = "Gender is required"
        }

        if(values.gender === "Not Selected"){
            errors.gender = "Select a Gender"
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

        if(values.state === "Not Selected"){
            errors.state = "Select a State"
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

        if(!values.password){
            errors.password = "Password is required"
        }

        if(!values.confirm_password){
            errors.confirm_password = "Confirm the Password"
        }

        if(values.password !== values.confirm_password){
            errors.confirm_password = "Password not matched"
        }

        return errors
    }

    useEffect(() => {
        if(Object.keys(formErrors).length === 0 && isSubmit)
        registerUser()
    },[formErrors])

    return (
        <div style={{
            backgroundImage: `url(${sign})`,
            height: 'auto',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
        }}>
            <h3 className='text-center pt-3 mb-3'>Sign Up</h3>
            <Form className='mx-auto mt-4 w-75'>
                <Row className='mb-3'>
                    <Col>
                        <Form.Group>
                            <Form.Label>First Name:</Form.Label>
                            <Form.Control onChange={(e) => changeHandler(e)} name='first_name' value={data.first_name} type='text' placeholder='Enter First Name' />
                            <label style={{color: 'red'}}>{formErrors.first_name}</label>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Last Name:</Form.Label>
                            <Form.Control onChange={(e) => changeHandler(e)} name='last_name' value={data.last_name} type='text' placeholder='Enter Last Name' />
                            <label style={{color: 'red'}}>{formErrors.last_name}</label>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className='mb-3'>
                    <Col>
                        <Form.Group>
                            <Form.Label>Username:</Form.Label>
                            <Form.Control onChange={(e) => changeHandler(e)} name='username' value={data.username} type='text' placeholder='Enter Username' />
                            <label style={{color: 'red'}}>{formErrors.username}</label>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Email:</Form.Label>
                            <Form.Control onChange={(e) => changeHandler(e)} name='email_id' value={data.email_id} type='email' placeholder='Enter Email Id' />
                            <label style={{color: 'red'}}>{formErrors.email_id}</label>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className='mb-3'>
                    <Col>
                        <Form.Group>
                            <Form.Label>Gender:</Form.Label>
                            <Form.Select onChange={(e) => changeHandler(e)} name='gender' value={data.gender}>
                                <option value="Not Selected">Choose an option</option>
                                <option value={"Male"}>Male</option>
                                <option value={"Female"}>Female</option>
                                <option value={"Prefer not to say"}>Prefer not to say</option>
                            </Form.Select>
                            <label style={{color: 'red'}}>{formErrors.gender}</label>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Mobile No:</Form.Label>
                            <Form.Control onChange={(e) => changeHandler(e)} name='mobile_no' value={data.mobile_no} type='text' placeholder='Enter Mobile No' />
                            <label style={{color: 'red'}}>{formErrors.mobile_no}</label>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className='mb-3'>
                    <Col>
                        <Form.Group>
                            <Form.Label>Address:</Form.Label>
                            <Form.Control onChange={(e) => changeHandler(e)} name='address' value={data.address} type='text' placeholder='Enter Address' />
                            <label style={{color: 'red'}}>{formErrors.address}</label>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className='mb-3'>
                    <Col>
                        <Form.Group>
                            <Form.Label>State:</Form.Label>
                            <Form.Select onChange={(e) => changeHandler(e)} name='state' value={data.state} className=''>
                                <option value="Not Selected">Choose an option</option>
                                <option value="Andhra Pradesh">Andhra Pradesh</option>
                                <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                <option value="Assam">Assam</option>
                                <option value="Bihar">Bihar</option>
                                <option value="Chandigarh">Chandigarh</option>
                                <option value="Chhattisgarh">Chhattisgarh</option>
                                <option value="Dadar and Nagar Haveli">Dadar and Nagar Haveli</option>
                                <option value="Daman and Diu">Daman and Diu</option>
                                <option value="Delhi">Delhi</option>
                                <option value="Lakshadweep">Lakshadweep</option>
                                <option value="Puducherry">Puducherry</option>
                                <option value="Goa">Goa</option>
                                <option value="Gujarat">Gujarat</option>
                                <option value="Haryana">Haryana</option>
                                <option value="Himachal Pradesh">Himachal Pradesh</option>
                                <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                                <option value="Jharkhand">Jharkhand</option>
                                <option value="Karnataka">Karnataka</option>
                                <option value="Kerala">Kerala</option>
                                <option value="Madhya Pradesh">Madhya Pradesh</option>
                                <option value="Maharashtra">Maharashtra</option>
                                <option value="Manipur">Manipur</option>
                                <option value="Meghalaya">Meghalaya</option>
                                <option value="Mizoram">Mizoram</option>
                                <option value="Nagaland">Nagaland</option>
                                <option value="Odisha">Odisha</option>
                                <option value="Punjab">Punjab</option>
                                <option value="Rajasthan">Rajasthan</option>
                                <option value="Sikkim">Sikkim</option>
                                <option value="Tamil Nadu">Tamil Nadu</option>
                                <option value="Telangana">Telangana</option>
                                <option value="Tripura">Tripura</option>
                                <option value="Uttar Pradesh">Uttar Pradesh</option>
                                <option value="Uttarakhand">Uttarakhand</option>
                                <option value="West Bengal">West Bengal</option>
                            </Form.Select>
                            <label style={{color: 'red'}}>{formErrors.state}</label>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>City:</Form.Label>
                            <Form.Control onChange={(e) => changeHandler(e)} name='city' value={data.city} type='text' placeholder='Enter City' />
                            <label style={{color: 'red'}}>{formErrors.city}</label>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Street:</Form.Label>
                            <Form.Control onChange={(e) => changeHandler(e)} name='street' value={data.street} type='text' placeholder='Enter Street' />
                            <label style={{color: 'red'}}>{formErrors.street}</label>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className='mb-3'>
                    <Col>
                        <Form.Group>
                            <Form.Label>Zip Code:</Form.Label>
                            <Form.Control onChange={(e) => changeHandler(e)} name='zip_code' value={data.zip_code} type='text' placeholder='Enter Zip Code' />
                            <label style={{color: 'red'}}>{formErrors.zip_code}</label>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Password:</Form.Label>
                            <Form.Control onChange={(e) => changeHandler(e)} name='password' value={data.password} type='password' placeholder='Enter Password' />
                            <label style={{color: 'red'}}>{formErrors.password}</label>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className='mb-3'>
                    <Col xl={6}>
                        <Form.Group>
                            <Form.Label>Confirm Password:</Form.Label>
                            <Form.Control onChange={(e) => changeHandler(e)} name='confirm_password' value={data.confirm_password} type='password' placeholder='Confirm Password' />
                            <label style={{color: 'red'}}>{formErrors.confirm_password}</label>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className='my-2'>
                    <Col>
                        <Form.Group>
                            <Form.Check type='checkbox' label="I have read and agreed to Shopkart's Terms of Use and Privacy Policy." />
                        </Form.Group>
                    </Col>
                </Row>
                <Button onClick={(e) => clickHandler(e)} className='my-3 me-2'>Submit</Button>
                <Button variant='success' className='my-3 ms-2' href='/userLogin'>Back</Button>
            </Form>
        </div>
    )
}

export default UserSignUpPage