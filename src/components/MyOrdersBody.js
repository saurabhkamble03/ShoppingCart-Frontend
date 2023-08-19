import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'

const MyOrdersBody = () => {

    const location = useLocation()
    const navigate = useNavigate()

    const initialValues = [
        {
            order_id: "",
            user: {
                user_id: ""
            },

            total: "",
            status: "In-Progress"
        }
    ]

    const [orders, setOrders] = useState(initialValues)

    const getOrders = async (userId) => {
        const response = await axios.get(`http://localhost:8080/getOrders/${userId}`)
        console.log(response.data)
        setOrders(response.data)
    }

    const getSession = async () => {
        const response = await axios.get(`http://localhost:8080/getSession`)
        if (response.data === 0) {
            navigate('/login')
        }
    }

    useEffect(() => {
        getSession()
        getOrders(location.state.user_id)
    }, [])

    return (
        <div>
            <h3 className='my-3 text-center'>My Orders</h3>
            {
                orders.length !== 0 ?

                    <Table className='mx-auto w-75 my-4' striped bordered>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Total</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {

                                orders.map((order) => (
                                    <tr key={order.order_id}>
                                        <td>*</td>
                                        <td>{order.total}</td>
                                        <td>{order.status}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                    :
                    <div style={{ height: '20rem' }}>
                        <h4 className='text-center my-5'>Your have not ordered anything yet</h4>
                    </div>
            }
        </div>
    )
}

export default MyOrdersBody