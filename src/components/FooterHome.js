import React from 'react'
import Container from 'react-bootstrap/esm/Container'
import { Row, Col, Image } from 'react-bootstrap'
import { Facebook, Instagram, Twitter } from 'react-bootstrap-icons'
import payment from '../assets/images/payment.png'

const FooterHome = () => {
  return (
    <footer className='py-5 bg-dark'>
      <Container className='mx-auto text-white'>
        <Row className='mx-auto'>
          <Col className='text-center'>
            CopyRight &copy; ShopCart 2023 Incl, All rights reserved
          </Col>
          <Col className='text-center'>
            <a className='mx-2 text-white' href='#'><Twitter size={30} /></a>
            <a className='mx-2 text-white' href='#'><Instagram size={30} /></a>
            <a className='mx-2 text-white' href='#'><Facebook size={30} /></a>
          </Col>
        </Row>
        <Row className='mx-auto my-3'>
          <Col className='text-center'>
            <Image style={{ width: "130px" }} src={payment} fluid />
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default FooterHome