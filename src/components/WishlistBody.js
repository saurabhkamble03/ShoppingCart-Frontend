import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import { HeartbreakFill } from 'react-bootstrap-icons'
import { useNavigate, useLocation } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const WishlistBody = () => {

    const location = useLocation()
    const navigate = useNavigate()

    const [click, setClick] = useState(false)

    const initialWishlist = [
        {
            wishlist_id: "",
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
            }
        }
    ]

    const [wisthlist, setWishlist] = useState(initialWishlist)

    const clickHandler = (e, id) => {
        e.preventDefault()
        navigate('/item', {
            state: {
                item_id: id
            }
        }
        )
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
            if(response.data){
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

    const removeWishlist = async (e, wishlistId) => {
        e.preventDefault()
        try {
            const response = await axios.delete(`http://localhost:8080/deleteWishlist/${wishlistId}`)
            setClick(!click)
        }
        catch (error) {
            console.error(error)
        }
    }

    const getWishlist = async () => {
        try {

            const user = await axios.get(`http://localhost:8080/getSession`)

            const response = await axios.get(`http://localhost:8080/getWishlists/${user.data}`)
            console.log(response.data)
            setWishlist(response.data)
        }
        catch (error) {
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
        getWishlist()
    }, [click])

    return (
        <div>
            <h2 className='my-3 text-center'>My Wishlist</h2>
            {
                wisthlist.length !== 0 ?
                    <Container className='mx-auto my-3'>
                        <Row md={6} xl={4}>
                            {
                                wisthlist.map((wish) => (
                                    <Card key={wish.wishlist_id} style={{ width: '18rem' }} className='mx-auto my-2'>
                                        <a style={{ cursor: 'pointer' }} onClick={e => clickHandler(e, wish.item.item_id)}><Card.Img variant='top' src={wish.item.img} /></a>
                                        <Card.Body className='mx-auto'>
                                            <Card.Title className='text-center'>{wish.item.item_name}</Card.Title>
                                            <Card.Text className='text-center'>₹{wish.item.price}</Card.Text>
                                            <div>
                                                <Button onClick={(e) => buyHandler(e, wish.item.item_id)} className='mx-2'>Buy</Button>
                                                <Button onClick={(e) => cartHandler(e, wish.item.item_id)} variant='success' className='mx-2'>Add to cart</Button>
                                                <HeartbreakFill style={{ cursor: 'pointer' }} onClick={(e) => removeWishlist(e, wish.wishlist_id)} className='mx-2' color='red' size={25} />
                                            </div>
                                        </Card.Body>
                                    </Card>
                                ))
                            }
                        </Row>
                    </Container>
                    :
                    <div style={{height: '20rem'}}>
                        <h4 className='text-center my-5'>Your Wishlist Is Empty</h4>
                    </div>
            }
        </div>
    )
}

export default WishlistBody