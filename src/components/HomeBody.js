import React, { useEffect } from 'react'
import { Carousel, Button, Col, Container, Image, Row } from 'react-bootstrap'
import head from '../assets/images/headphoneSlide.jpg'
import mobile from '../assets/images/mobile.jpg'
import football from '../assets/images/football.jpg'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const HomeBody = () => {

    const navigate = useNavigate()

    const clickHandler = (e, catname) => {
        e.preventDefault()
        getSession()
        navigate('/category', {
            state: {
                category_name: catname
            }
        })
    }

    const getSession = async () => {
        const response = await axios.get(`http://localhost:8080/getSession`)
        if(response.data === 0){
            navigate('/login')
        }
    }

    // useEffect(() => {
    //     getSession()
    // },[])

    return (
        <div>
            <Container className='my-5'>
                <Carousel>
                    <Carousel.Item>
                        <a style={{cursor: 'pointer'}} onClick={(e) => {clickHandler(e,'Fashion')}}>
                            <img
                                style={{ objectFit: "cover" }}
                                height={300}
                                className="d-block w-100"
                                src={head}
                                alt="First slide"
                            />
                            <Carousel.Caption>
                                <h3 style={{ color: "white" }}>Fresh Fashion Sale</h3>
                            </Carousel.Caption>
                        </a>
                    </Carousel.Item>
                    <Carousel.Item>
                        <a style={{cursor: 'pointer'}} onClick={(e) => {clickHandler(e, 'Electronics')}}>
                            <img
                                style={{ objectFit: "cover" }}
                                height={300}
                                className="d-block w-100"
                                src={mobile}
                                alt="Second slide"
                            />

                            <Carousel.Caption>
                                <h3 style={{ color: "red" }}>Latest Electronic Arrivals</h3>
                            </Carousel.Caption>
                        </a>
                    </Carousel.Item>
                    <Carousel.Item>
                        <a style={{cursor: 'pointer'}} onClick={(e) => clickHandler(e,'Sports & Fitness')}>
                            <img
                                style={{ objectFit: "cover" }}
                                height={300}
                                className="d-block w-100"
                                src={football}
                                alt="Third slide"
                            />

                            <Carousel.Caption>
                                <h3 style={{ color: 'black' }}>Sports & Fitness</h3>
                            </Carousel.Caption>
                        </a>
                    </Carousel.Item>
                </Carousel>


                <h2 className='my-5 text-center'>Popular Categories</h2>
                <Row className=''>
                    <Col className='mx-auto mb-2' xs={6} md={4} xl={2}>
                        <a style={{ textDecoration: "none", color: "black", cursor: "pointer" }} onClick={(e) => { clickHandler(e, 'Sports & Fitness') }}>
                            <Image src='https://m.media-amazon.com/images/I/51UpB4okPpL._AC_UF1000,1000_QL80_.jpg' fluid />
                            <h6 className='my-2 text-center'>Sports & Fitness</h6>
                        </a>
                    </Col>
                    <Col className='mx-auto' xs={6} md={4} xl={2}>
                        <a style={{ textDecoration: "none", color: "black", cursor: 'pointer' }} onClick={(e) => {clickHandler(e, 'Electronics')}}>
                            <Image src='https://image01.realme.net/general/20220429/1651221270436.png.webp' fluid />
                            <h6 className='my-2 text-center'>Electronics</h6>
                        </a>
                    </Col>
                    <Col className='mx-auto' xs={6} md={4} xl={2}>
                        <a style={{ textDecoration: "none", color: "black",cursor: 'pointer' }} onClick={(e) => {clickHandler(e, 'Toys')}}>
                            <Image src='https://image.smythstoys.com/original/desktop/207781_6.jpg' fluid />
                            <h6 className='my-2 text-center'>Toys</h6>
                        </a>
                    </Col>
                    <Col className='mx-auto' xs={6} md={4} xl={2}>
                        <a style={{ textDecoration: "none", color: "black", cursor: 'pointer' }} onClick={(e) => {clickHandler(e, 'Home & Appliances')}}>
                            <Image src='https://wakefitdev.gumlet.io/img/sofa-sets/barcelona/regular/lifestyle/FOBL.jpg?w=732' fluid />
                            <h6 className='my-2 text-center'>Home & Appliances</h6>
                        </a>
                    </Col>
                    <Col className='mx-auto' xs={6} md={4} xl={2}>
                        <a style={{ textDecoration: "none", color: "black", cursor: 'pointer' }} onClick={(e) => {clickHandler(e, 'Books')}}>
                            <Image src='https://target.scene7.com/is/image/Target/GUEST_9a3ed0ee-4de9-4a6f-abb3-6aae5d4b3755?wid=488&hei=488&fmt=pjpeg' fluid />
                            <h6 className='my-2 text-center'>Books</h6>
                        </a>
                    </Col>
                </Row>
                {/* <Row>
                    <Button className='w-25 my-2 mx-auto'>Browse More</Button>
                </Row> */}
            </Container>
        </div>
    )
}

export default HomeBody