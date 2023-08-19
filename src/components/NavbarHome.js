import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip';
import axios from 'axios';

const NavbarHome = () => {

    const initialValues = [
        {
            category_id: "",
            category_name: ""
        }
    ]

    const[categories, setCategories] = useState(initialValues)

    const getCategories = async () => {
        await axios.get(`http://localhost:8080/getAllCategories`)
            .then(res => {
                console.log(res.data)
                setCategories(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        getCategories()
    }, [])

    return (
        <Navbar bg="primary" data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
            <Container fluid>
                <Navbar.Brand>ShopCart</Navbar.Brand>
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
                        <Nav.Link href="/">Home</Nav.Link>
                        <NavDropdown title="Categories" id="navbarScrollingDropdown">
                            {
                                categories.map((cat) => (
                                    <NavDropdown.Item key={cat.category_id} href="/category">{cat.category_name}</NavDropdown.Item>
                                ))
                            }
                        </NavDropdown>
                    </Nav>
                    <div className='navbar-right'>
                        <OverlayTrigger
                            delay={{ hide: 450, show: 300 }}
                            placement='bottom'
                            overlay={
                                <Tooltip>
                                    Login
                                </Tooltip>
                            }
                        >
                            <Link to={'/login'}> <Button className='mx-3'>Login</Button></Link>
                        </OverlayTrigger>

                        <OverlayTrigger
                            delay={{ hide: 450, show: 300 }}
                            placement='bottom'
                            overlay={
                                <Tooltip>
                                    Sign Up
                                </Tooltip>
                            }
                        >
                            <Link to={'/userSignUp'}><Button className=''>Sign Up</Button></Link>
                        </OverlayTrigger>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavbarHome