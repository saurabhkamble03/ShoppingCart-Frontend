import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddItemBody = () => {

    const navigate = useNavigate()

    const initialCategories = [{
        category_id: '',
        category_name: ''
    }]

    const [categories, setCategories] = useState(initialCategories)

    const initialValues = {
        category: {
            category_id: ""
        },
        item_name: "",
        price: "",
        quantity: "",
        img: ""
    }

    const [data, setData] = useState(initialValues)
    const [formErrors, setFormErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)

    const changeHandler = (e) => {
        const newData = { ...data }
        newData[e.target.name] = e.target.value
        setData(newData)
    }

    const clickHandler = (e) => {
        e.preventDefault()
        setFormErrors(validate(data))
        setIsSubmit(true)
    }

    const addItemHandler = async () => {
        try {
            console.log(data)
            console.log(data.category)


            const response = await axios.post(`http://localhost:8080/addItem`,
                {
                    category: {
                        category_id: data.category_id
                    },
                    item_name: data.item_name,
                    price: data.price,
                    quantity: data.quantity,
                    img: data.img
                })
            console.log(response.data)

            if (response.data) {
                navigate('/adminHome')
            }
        }
        catch (error) {
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
            console.error(error)
        }
    }

    const getCategories = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/getAllCategories`)
            console.log(response.data)
            setCategories(response.data)
        }
        catch (error) {
            console.error(error)
        }
    }

    const getAdminSession = async () => {
        const response = await axios.get(`http://localhost:8080/getAdminSession`)
        if (response.data === 0) {
            navigate('/login')
        }
    }

    const validate = (values) => {
        const errors = {}

        if (!values.item_name) {
            errors.item_name = "Item Name is required"
        }

        if (!values.category_id) {
            errors.category_id = "Category Name is required"
        }

        if (values.category_id === "Not Selected") {
            errors.category_id = "Select a Category Name"
        }

        if (!values.price) {
            errors.price = "Price is required"
        }

        if (!values.quantity) {
            errors.quantity = "Quantity is required"
        }

        if (!values.img) {
            errors.img = "Image URL is required"
        }

        return errors
    }

    useEffect(() => {
        getAdminSession()
        getCategories()
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            addItemHandler()
        }
    }, [formErrors])

    return (
        <div>
            <h1 className='text-center py-4'>Add Item</h1>
            <Form className='mx-auto w-50'>
                <Form.Group className='mb-3'>
                    <Form.Label>Item :</Form.Label>
                    <Form.Control onChange={(e) => changeHandler(e)} type='text' name='item_name' placeholder='Enter Item Name' />
                    <p style={{ color: 'red' }}>{formErrors.item_name}</p>
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Category :</Form.Label>
                    <Form.Select onChange={(e) => changeHandler(e)} name='category_id'>
                        <option value="Not Selected">Choose an option</option>
                        {
                            categories.map((cat) => (
                                <option key={cat.category_id} value={cat.category_id}>{cat.category_name}</option>
                            ))
                        }
                    </Form.Select>
                    <p style={{ color: 'red' }}>{formErrors.category_id}</p>
                </Form.Group>
                <p style={{ color: 'orange' }}>Can't find a category?<a href='/addCategory'>Click Here</a></p>
                <Form.Group className='mb-3'>
                    <Form.Label>Price (₹) :</Form.Label>
                    <Form.Control onChange={(e) => changeHandler(e)} type='number' name='price' placeholder='Enter Price' />
                    <p style={{ color: 'red' }}>{formErrors.price}</p>
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Quantity :</Form.Label>
                    <Form.Control onChange={(e) => changeHandler(e)} type='number' name='quantity' placeholder='Enter Item Quantity' />
                    <p style={{ color: 'red' }}>{formErrors.quantity}</p>
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Image :</Form.Label>
                    <Form.Control onChange={(e) => changeHandler(e)} type='text' name='img' placeholder='Enter Image URL' />
                    <p style={{ color: 'red' }}>{formErrors.img}</p>
                </Form.Group>
                <Button onClick={(e) => navigate(-1)} variant='warning' className='mb-3 me-3'>Back</Button>
                <Button onClick={(e) => clickHandler(e)} variant='info' className='mb-3'>Add</Button>
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
        </div>
    )
}

export default AddItemBody