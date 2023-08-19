import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'

const UpdateItemBody = () => {

    const navigate = useNavigate()
    const location = useLocation()

    const initialDetails = {
        item_id: "",
        category: {
            category_id: "",
            category_name: ""
        },
        item_name: "",
        price: "",
        quantity: "",
        img: ""
    }

    const [details, setDetails] = useState(initialDetails)
    const [formErrors, setFormErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)

    const changeHandler = (e) => {
        const {name,value} = e.target
        setDetails({...details,[name]:value})
    }

    const clickHandler = (e) => {
        e.preventDefault()
        setFormErrors(validate(details))
        setIsSubmit(true)
    }

    const updateHandler = async (itemId) => {
        try{
            const response = await axios.put(`http://localhost:8080/updateItem/${itemId}`,details)
            console.log(response.data)
            navigate(-1)
        }
        catch(error){
            console.error(error)
        }
    }

    const getItemDetails = async (itemId) => {
        try {
            const response = await axios.get(`http://localhost:8080/getItem/${itemId}`)
            setDetails(response.data)
        }
        catch (error) {
            console.error(error)
        }
    }

    const validate = (values) => {
        const errors = {}

        if(!values.item_name){
            errors.item_name = "Item Name is required"
        }

        if(!values.price){
            errors.price = "Price is required"
        }

        if(!values.quantity){
            errors.quantity = "Quantity is required"
        }

        if(!values.img){
            errors.img = "Image URL is required"
        }

        return errors
    }

    useEffect(() => {
        getItemDetails(location.state.item_id)
        if(Object.keys(formErrors).length === 0 && isSubmit){
            updateHandler(location.state.item_id)
        }
    }, [location,formErrors])

    return (
        <div>
            <h1 className='text-center py-4'>Update Item</h1>
            <Form className='mx-auto w-50'>
                <Form.Group className='mb-3'>
                    <Form.Label>Item :</Form.Label>
                    <Form.Control onChange={(e) => changeHandler(e)} type='text' name='item_name' value={details.item_name} placeholder='Enter Item Name' />
                    <p style={{color: 'red'}}>{formErrors.item_name}</p>
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Category :</Form.Label>
                    <Form.Control onChange={(e) => changeHandler(e)} disabled type='text' name='category_name' value={details.category.category_name} placeholder='Enter Category Name' />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Price (₹) :</Form.Label>
                    <Form.Control onChange={(e) => changeHandler(e)} type='number' name='price' value={details.price} placeholder='Enter Price' />
                    <p style={{color: 'red'}}>{formErrors.price}</p>
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Quantity :</Form.Label>
                    <Form.Control onChange={(e) => changeHandler(e)} type='number' name='quantity' value={details.quantity} placeholder='Enter Item Quantity' />
                    <p style={{color: 'red'}}>{formErrors.quantity}</p>
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Image :</Form.Label>
                    <Form.Control onChange={(e) => changeHandler(e)} type='text' name='img' value={details.img} placeholder='Enter Image URL' />
                    <p style={{color: 'red'}}>{formErrors.img}</p>
                </Form.Group>
                <Button onClick={(e) => navigate(-1)} className='mb-3 me-3'>Back</Button>
                <Button onClick={(e) => clickHandler(e)} variant='warning' className='mb-3'>Update</Button>
            </Form>
        </div>
    )
}

export default UpdateItemBody