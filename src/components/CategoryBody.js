import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import { Heart } from 'react-bootstrap-icons'
import { useLocation, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CategoryBody = () => {

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

    // const initialCart = {
    //     user: {
    //         user_id: ""
    //     },
    //     item: {
    //         item_id: ""
    //     },
    //     item_quantity: ""
    // }

    const [items, setItems] = useState(initialItems)
    // const [cart, setCart] = useState(initialCart)

    const clickHandler = (e, id) => {
        e.preventDefault()
        navigate('/item', {
            state: {
                item_id: id,
                user_id: location.state.user_id
            }
        })
    }

    const buyHandler = async (e, itemId) => {
        e.preventDefault()
        try {
            const response = axios.post(`http://localhost:8080/addCart`,
                {
                    user: {
                        user_id: location.state.user_id
                    },
                    item: {
                        item_id: itemId
                    },
                    item_quantity: 1
                }
            )
            navigate('/myCart', {
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

    const cartHandler = async (e, itemId) => {
        e.preventDefault()
        try {
            const response = await axios.post(`http://localhost:8080/addCart`,
                {
                    user: {
                        user_id: location.state.user_id
                    },
                    item: {
                        item_id: itemId
                    },
                    item_quantity: 1
                }
            )

            if (response.data) {
                toast.success('Item added to cart', {
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
            else {
                toast.warning('Item not added to cart !', {
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
            navigate("/login")
        }
    }

    useEffect(() => {
        getSession()
    }, [])

    const wishlistHandler = async (e, itemId) => {
        e.preventDefault()
        try {
            const response = await axios.post(`http://localhost:8080/addWishlist`, {
                user: {
                    user_id: location.state.user_id
                },
                item: {
                    item_id: itemId
                }
            })
            if (response.data) {
                toast.success('Item added to wishlist', {
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
            else {
                toast.info('Item already in wishlist !', {
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
        }
        catch (error) {
            console.error(error)
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
        }

    }

    const getItemsByCategory = async (category) => {
        await axios.get(`http://localhost:8080/getItemsByCategory/${category}`)
            .then(res => {
                console.log(res.data)
                setItems(res.data)
                console.log(items)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        getItemsByCategory(location.state.category_name)
        console.log(location)
    }, [location])

    return (
        <div>
            <h2 className='my-3 text-center'>{location.state.category_name}</h2>
            <Container className='mx-auto my-3'>
                <Row className='' md={6} xl={4}>
                    {
                        items.map((item) => (
                            <Card key={item.item_id} style={{ width: '18rem' }} className='mx-auto my-2'>
                                <a style={{ cursor: 'pointer' }} onClick={(e) => clickHandler(e, item.item_id)}><Card.Img variant='top' src={item.img} /></a>
                                <Card.Body className='mx-auto'>
                                    <Card.Title className='text-center'>{item.item_name}</Card.Title>
                                    <Card.Text className='text-center'>₹{item.price}</Card.Text>
                                    <Button onClick={(e) => buyHandler(e, item.item_id)} className='mx-2'>Buy</Button>
                                    <Button onClick={(e) => cartHandler(e, item.item_id)} variant='success' className='mx-2'>Add to cart</Button>
                                    <Heart style={{ cursor: 'pointer' }} onClick={(e) => wishlistHandler(e, item.item_id)} className='mx-2' color='red' size={25} />
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

export default CategoryBody