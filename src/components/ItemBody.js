import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import { Heart } from 'react-bootstrap-icons'
import { useLocation, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ItemBody = () => {

  const location = useLocation()
  const navigate = useNavigate()

  // console.log(location)

  const initialItem = {
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

  const [item, setItem] = useState(initialItem)

  const getItem = async (item_id) => {
    try {
      const response = await axios.get(`http://localhost:8080/getItem/${item_id}`)
      // console.log(response)
      // console.log(response.data)
      setItem(response.data)
    }
    catch (err) {
      console.log(err)
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
    getItem(location.state.item_id)
  }, [])

  return (
    <div>
      <Button onClick={() => navigate(-1)} className='m-3'>Back</Button>
      <Card className='mx-auto my-2' style={{ width: '25rem' }}>
        <Card.Img variant='top' src={item.img} />
        <Card.Body className='text-center'>
          <Card.Title>{item.item_name}</Card.Title>
          <Card.Text>₹{item.price}</Card.Text>
          <Button onClick={(e) => buyHandler(e, item.item_id)} className='mx-2'>Buy</Button>
          <Button onClick={(e) => cartHandler(e, item.item_id)} variant='success' className='mx-2'>Add to Cart</Button>
          <Heart style={{ cursor: 'pointer' }} onClick={(e) => wishlistHandler(e, item.item_id)} className='mx-2' color='red' size={25} />
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

export default ItemBody