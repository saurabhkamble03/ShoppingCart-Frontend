import React from 'react'
import { Button, Form } from 'react-bootstrap'

const ContactUs = () => {
    return (
        <div className='py-3' style={{backgroundColor: "#e2deff"}}>
            <h3 className='mt-5 text-center'>Contact Us</h3>
            <p className='text-center'>
                Question? Do not hestitate to contact us.
            </p>
            <Form className='mt-5 mx-auto w-50'>
                <Form.Group className='mb-3' controlId='formBasicEmail'>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type='email' placeholder='Enter your email'></Form.Control>
                </Form.Group>
                <Form.Group className='mb-3' controlId='formBasicEmail'>
                    <Form.Label>Name:</Form.Label>
                    <Form.Control type='email' placeholder='Enter your name'></Form.Control>
                </Form.Group>
                <Form.Group className='mb-3' controlId='formBasicEmail'>
                    <Form.Label>Query:</Form.Label>
                    <textarea
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        rows="5"
                        placeholder='Enter your query'
                    />
                </Form.Group>
                <Button>Submit</Button>
            </Form>
        </div>
    )
}

export default ContactUs