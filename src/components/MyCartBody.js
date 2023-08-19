import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { Bag, Trash } from 'react-bootstrap-icons'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyCartBody = () => {

    const location = useLocation()
    const navigate = useNavigate()

    const [subtotal, setSubtotal] = useState(0)
    const [click, setClick] = useState(false)

    const initialCart = [{
        cart_id: "",
        user: {
            user_id: "",
            first_name: "",
            last_name: "",
            username: "",
            gender: "",
            mobile_no: "",
            email_id: "",
            address: "",
            state: "",
            city: "",
            street: "",
            zip_code: "",
            password: ""
        },
        item: {
            item_id: "",
            category: {
                category_id: "",
                category_name: ""
            },
            item_name: "",
            price: "",
            quantity: "",
            img: ""
        },
        item_quantity: "",
        subtotal: ""
    }
    ]

    const [cart, setCart] = useState(initialCart)

    const getCart = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:8080/getCartByUserId/${userId}`)
            setCart(response.data)
            console.log(response.data)
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

    const getSubtotal = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:8080/getSubtotal/${userId}`)
            setSubtotal(response.data)
        }
        catch (error) {
            console.error(error)
        }
    }

    const deleteHandler = async (e, itemId, userId) => {
        e.preventDefault()

        try {
            const response = await axios.delete(`http://localhost:8080/deleteItemFromCart/${itemId}/${userId}`)
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

    const plusHandler = async (e, itemId, userId) => {
        e.preventDefault()
        try {
            const response = await axios.put(`http://localhost:8080/plusItem/${itemId}/${userId}`)
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

    const minusHandler = async (e, itemId, userId, qty) => {
        e.preventDefault()
        try {
            if (qty === 1) {
                const response = await axios.delete(`http://localhost:8080/deleteItemFromCart/${itemId}/${userId}`)
                console.log(response.data)
                setClick(!click)
            }
            else {
                const response = await axios.put(`http://localhost:8080/minusItem/${itemId}/${userId}`)
                setClick(!click)
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

    const placeOrderHandler = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post(`http://localhost:8080/addOrder`,
                {
                    user: {
                        user_id: location.state.user_id
                    },
                    total: subtotal,
                    status: 'In-Progress'
                }
            )

            const dresponse = await axios.delete(`http://localhost:8080/deleteCart/${location.state.user_id}`)
            console.log('dresponse : ' + dresponse.data)

            navigate('/myOrders', {
                state: {
                    user_id: location.state.user_id
                }
            })
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

    const getSession = async () => {
        const response = await axios.get(`http://localhost:8080/getSession`)
        if (response.data === 0) {
            navigate('/login')
        }
    }

    useEffect(() => {
        getSession()
        getCart(location.state.user_id)
        getSubtotal(location.state.user_id)
    }, [click])

    return (
        <div>
            <h2 className='my-4 text-center'>My Cart</h2>
            {
                cart.length !== 0 ?
                    <div>
                        <Container>
                            {cart.map((Cart) => (
                                <div key={Cart.cart_id}>
                                    <Row className='mx-auto' >
                                        <Col className='' md={6} xl={4}>
                                            <img style={{
                                                display: 'block',
                                                marginLeft: 'auto',
                                                marginRight: 'auto',
                                                width: '50%'
                                            }}
                                                src={Cart.item.img} />
                                            <p className='text-center'>{Cart.item.item_name}</p>
                                        </Col>
                                        <Col className=' d-flex justify-content-center align-items-center' md={6} xl={4}>
                                            <div>
                                                <Button onClick={(e) => minusHandler(e, Cart.item.item_id, Cart.user.user_id, Cart.item_quantity)} variant='warning' className='mx-2'>-</Button>
                                                {Cart.item_quantity}
                                                <Button onClick={(e) => plusHandler(e, Cart.item.item_id, Cart.user.user_id)} variant='success' className='mx-2'>+</Button>
                                                <Trash style={{ cursor: 'pointer' }} onClick={(e) => deleteHandler(e, Cart.item.item_id, Cart.user.user_id)} className='mx-2' color='red' size={25} />
                                            </div>
                                        </Col>
                                        <Col className=' d-flex justify-content-center align-items-center my-2' md={6} xl={4}>
                                            Total - ₹{Cart.subtotal}
                                        </Col>
                                    </Row>
                                    <hr />
                                </div>
                            ))}
                        </Container>

                        <h5 className='my-4 text-center'>Subtotal - ₹{subtotal}</h5>
                        <div className='d-flex align-items-center justify-content-center'>
                            <Button onClick={(e) => placeOrderHandler(e)} className='my-4'><Bag size={25} /> Place Order</Button>
                        </div>
                    </div>
                    :
                    <div style={{ height: '20rem' }}>
                        <h4 className='text-center my-5'>Your Cart Is Empty</h4>
                    </div>
            }
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

export default MyCartBody