import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminItemBody = () => {

    const location = useLocation()
    const navigate = useNavigate()

    const initialItem = {
        item_id: "",
        category: {
            category_id: ""
        },
        item_name: "",
        price: "",
        quantity: "",
        img: ""
    }

    const [item, setItem] = useState(initialItem)

    const updateHandler = (e, itemId) => {
        e.preventDefault()
        navigate('/updateItem', {
            state: {
                item_id: itemId
            }
        })
    }

    const deleteHandler = async (e, itemId) => {
        e.preventDefault()

        try {
            const response = await axios.delete(`http://localhost:8080/deleteItem/${itemId}`)
            console.log(response.data)
            navigate(-1)
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

    const getItem = async (itemId) => {
        try {
            const response = await axios.get(`http://localhost:8080/getItem/${itemId}`)
            setItem(response.data)
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

    useEffect(() => {
        getAdminSession()
        getItem(location.state.item_id)
    })

    return (
        <div>
            <Button onClick={() => navigate(-1)} className='m-3'>Back</Button>
            <Card className='mx-auto my-2' style={{ width: '25rem' }}>
                <Card.Img variant='top' src={item.img} />
                <Card.Body className='text-center'>
                    <Card.Title>{item.item_name}</Card.Title>
                    <Card.Text>₹{item.price}</Card.Text>
                    <Button onClick={(e) => updateHandler(e, item.item_id)} className='mx-2'>Update</Button>
                    <Button onClick={(e) => deleteHandler(e, item.item_id)} variant='danger' className='mx-2'>Delete</Button>
                </Card.Body>
            </Card>
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

export default AdminItemBody