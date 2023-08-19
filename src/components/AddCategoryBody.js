import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddCategoryBody = () => {

    const navigate = useNavigate()

    const initialValues = {
        category_name: ''
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
        setFormErrors((validate(data)))
        setIsSubmit(true)
    }

    const addCategoryHandler = async () => {
        try {
            const response = await axios.post(`http://localhost:8080/addCategory`, data)
            console.log(response.data)
            if(!response.data){
                toast.warning('Category already exists!', {
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
            if(response.data){
                navigate('/addItem')
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

    const getAdminSession = async () => {
        const response = await axios.get(`http://localhost:8080/getAdminSession`)
        if (response.data === 0) {
            navigate('/login')
        }
    }

    const validate = (values) => {
        const errors = {}

        if (!values.category_name) {
            errors.category_name = "Category Name is required"
        }

        return errors
    }

    useEffect(() => {
        getAdminSession()

        if (Object.keys(formErrors).length === 0 && isSubmit) {
            addCategoryHandler()
        }
    }, [formErrors])

    return (
        <div style={{ height: '22rem' }}>
            <h1 className='text-center py-4'>Add Category</h1>
            <Form className='mx-auto w-50'>
                <Form.Group className='mb-3'>
                    <Form.Label>Category Name :</Form.Label>
                    <Form.Control onChange={(e) => changeHandler(e)} type='text' name='category_name' placeholder='Enter Category Name' />
                    <p style={{ color: 'red' }}>{formErrors.category_name}</p>
                </Form.Group>

                <Button onClick={(e) => navigate('/addItem')} variant='warning' className='mb-3 my-2 me-3'>Back</Button>
                <Button onClick={(e) => clickHandler(e)} variant='info' className='mb-3 my-2'>Add</Button>
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

export default AddCategoryBody