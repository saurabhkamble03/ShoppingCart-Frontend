import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { PlusLg, BoxArrowRight, Gear } from 'react-bootstrap-icons';
import OverlayTrigger from 'react-bootstrap/esm/OverlayTrigger';
import Tooltip from 'react-bootstrap/esm/Tooltip';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminNavbar = () => {

    const navigate = useNavigate()

    const initialCategories = [{
        category_id: '',
        category_name: ''
    }]

    const [categories, setCategories] = useState(initialCategories)

    const categoryHandler = (e, catId, catName) => {
        e.preventDefault()
        navigate('/adminCategory', {
            state: {
                category_id: catId,
                category_name: catName
            }
        })
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

    const logoutHandler = async (e) => {
        try {
            const response = await axios.post(`http://localhost:8080/adminLogout`
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

    useEffect(() => {
        getCategories()
    }, [])

    return (
        <Navbar bg="primary" data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
            <Container fluid>
                <Navbar.Brand href="/adminHome">ShopCart</Navbar.Brand>
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
                        <Nav.Link href="/adminHome">Home</Nav.Link>
                        <NavDropdown title="Categories" id="navbarScrollingDropdown">
                            {
                                categories.map((category) => (
                                    <NavDropdown.Item key={category.category_id} onClick={(e) => categoryHandler(e, category.category_id, category.category_name)} >{category.category_name}</NavDropdown.Item>
                                ))
                            }
                        </NavDropdown>
                        <Nav.Link href="/addItem">Add Item <PlusLg size={20} /> </Nav.Link>
                        <Nav.Link href="/manageOrders">Manage Orders <Gear size={20} /> </Nav.Link>
                    </Nav>
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

export default AdminNavbar