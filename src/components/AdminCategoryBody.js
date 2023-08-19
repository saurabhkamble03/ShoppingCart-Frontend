import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminCategoryBody = () => {

    const location = useLocation()
    const navigate = useNavigate()

    const initialItems = [
        {
            item_id: '',
            category: {
                category_id: '',
                category_name: ''
            },
            item_name: '',
            price: '',
            quantity: '',
            img: ''
        }
    ]

    const [items, setItems] = useState(initialItems)
    const [click, setClick] = useState(false)

    const itemHandler = (e, itemId) => {
        e.preventDefault()
        navigate('/adminItem', {
            state: {
                item_id: itemId
            }
        })
    }

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
            setClick(!click)
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

    const getItemsByCategory = async (catName) => {
        await axios.get(`http://localhost:8080/getItemsByCategory/${catName}`)
            .then(res => {
                console.log(res.data)
                setItems(res.data)
                console.log(items)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const getAdminSession = async () => {
        const response = await axios.get(`http://localhost:8080/getAdminSession`)
        if (response.data === 0) {
            navigate('/login')
        }
    }

    useEffect(() => {
        getAdminSession()
        getItemsByCategory(location.state.category_name)
    }, [location, click])

    return (
        <div>
            <h2 className='my-3 text-center'>{location.state.category_name}</h2>
            <Container className='mx-auto my-3'>
                <Row md={6} xl={4}>
                    {
                        items.map((item) => (
                            <Card key={item.item_id} style={{ width: '18rem' }} className='mx-auto my-2'>
                                <Card.Img style={{ cursor: 'pointer' }} onClick={(e) => itemHandler(e, item.item_id)} variant='top' src={item.img} />
                                <Card.Body className='mx-auto'>
                                    <Card.Title className='text-center'>{item.item_name}</Card.Title>
                                    <Card.Text className='text-center'>₹{item.price}</Card.Text>
                                    <Button onClick={(e) => updateHandler(e, item.item_id)} className='ms-3 me-3 '>Update</Button>
                                    <Button onClick={(e) => deleteHandler(e, item.item_id)} variant='danger' className='ms-3 me-3'>Delete</Button>
                                </Card.Body>
                            </Card>
                        ))
                    }
                </Row>
            </Container>
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

export default AdminCategoryBody