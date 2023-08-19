import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Bag, BoxArrowRight, Cart, Heart, Person } from 'react-bootstrap-icons';
import OverlayTrigger from 'react-bootstrap/esm/OverlayTrigger';
import Tooltip from 'react-bootstrap/esm/Tooltip';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserNavbar = () => {

    const navigate = useNavigate()
    const [userId, setUserId] = useState(-1)

    const clickHandler = (e, catname, catid) => {
        e.preventDefault()
        navigate('/category', {
            state: {
                category_name: catname,
                category_id: catid,
                user_id: userId
            },
        })
    }

    const wishlistHandler = (e, userId) => {
        e.preventDefault()
        navigate('/wishlist', {
            state: {
                user_id: userId
            },
        })
    }

    const logoutHandler = async (e) => {
        try {
            const response = await axios.post(`http://localhost:8080/userLogout`
                , { withCredentials: true }
            )
            console.log(response.data)
            // document.cookie()
            navigate('/login')
        }
        catch (err) {
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
            console.log(err)
        }
    }

    const initialCategories = [{
        category_id: '',
        category_name: ''
    }]

    const [categories, setCategories] = useState(initialCategories)


    const cartHandler = (e) => {
        e.preventDefault()
        navigate('/myCart', {
            state: {
                user_id: userId
            }
        })
    }

    const orderHandler = (e) => {
        e.preventDefault()
        navigate('/myOrders', {
            state: {
                user_id: userId
            }
        })
    }

    const getCategories = async () => {
        await axios.get(`http://localhost:8080/getAllCategories`)
            .then(res => {
                // console.log(res.data)
                setCategories(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const getUserSession = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/getSession`)
            console.log(response.data)
            setUserId(response.data)
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUserSession()
        getCategories()
    }, [])

    return (
        <Navbar bg="primary" data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
            <Container fluid>
                <Navbar.Brand href="/userHome">ShopCart</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto mx-3 my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >

                        <Form className="d-flex" style={{ width: '400px' }}>
                            <Form.Control
                                type="search"
                                placeholder="Search for products, brand and more"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-info">Search</Button>
                        </Form>
                        <Nav.Link href="/userHome">Home</Nav.Link>
                        <NavDropdown title="Categories" id="navbarScrollingDropdown">
                            {
                                categories.map((cat) => (
                                    <NavDropdown.Item onClick={(e) => clickHandler(e, cat.category_name, cat.category_id)} key={cat.category_id} href="/category">{cat.category_name}</NavDropdown.Item>
                                ))
                            }
                        </NavDropdown>
                    </Nav>
                    <OverlayTrigger
                        delay={{ hide: 450, show: 300 }}
                        placement='bottom'
                        overlay={
                            <Tooltip>
                                My Profile
                            </Tooltip>
                        }
                    >
                        <a href='/profile'><Person className='mx-3' color='white' size={25} /></a>
                    </OverlayTrigger>
                    <OverlayTrigger
                        delay={{ hide: 450, show: 300 }}
                        placement='bottom'
                        overlay={
                            <Tooltip>
                                Wihlist
                            </Tooltip>
                        }
                    >
                        <Heart style={{ cursor: 'pointer' }} onClick={(e) => wishlistHandler(e, userId)} className='mx-3' color='white' size={25} />
                    </OverlayTrigger>
                    <OverlayTrigger
                        delay={{ hide: 450, show: 300 }}
                        placement='bottom'
                        overlay={
                            <Tooltip>
                                My Orders
                            </Tooltip>
                        }
                    >
                        <Bag style={{ cursor: 'pointer' }} onClick={(e) => orderHandler(e)} className='mx-3' color='white' size={25} />
                    </OverlayTrigger>
                    <OverlayTrigger
                        delay={{ hide: 450, show: 300 }}
                        placement='bottom'
                        overlay={
                            <Tooltip>
                                My Cart
                            </Tooltip>
                        }
                    >
                        <Cart style={{ cursor: 'pointer' }} onClick={(e) => { cartHandler(e) }} className='mx-3' color='white' size={25} />
                    </OverlayTrigger>
                    <OverlayTrigger
                        delay={{ hide: 450, show: 300 }}
                        placement='bottom'
                        overlay={
                            <Tooltip>
                                Log Out
                            </Tooltip>
                        }
                    >
                        <BoxArrowRight style={{ cursor: 'pointer' }} onClick={(e) => logoutHandler(e)} className='mx-3' color='white' size={25} />
                    </OverlayTrigger>

                </Navbar.Collapse>
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
        </Navbar>
    )
}

export default UserNavbar