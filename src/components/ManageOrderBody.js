import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { CheckSquare } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManageOrderBody = () => {

    const navigate = useNavigate()

    const [data, setData] = useState([])
    const [click, setClick] = useState(false)

    const updateStatusHandler = async (e, userId, orderId) => {
        e.preventDefault()
        try {
            const response = await axios.put(`http://localhost:8080/updateStatus/${userId}/${orderId}`)
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

    const getPendingOrders = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/getPendingOrders`)
            console.log(response.data)
            setData(response.data)
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

    const getAdminSession = async () => {
        const response = await axios.get(`http://localhost:8080/getAdminSession`)
        if (response.data === 0) {
            navigate('/login')
        }
    }

    useEffect(() => {
        getAdminSession()
        getPendingOrders()
    }, [click])

    return (
        <div style={{ height: '21.5rem' }}>
            <h1 className='my-2 text-center'>Manage Orders</h1>
            {
                data.length !== 0 ?
                    <Table className="mx-auto w-75 my-4" striped bordered>
                        <thead>
                            <tr>
                                <th>Order Id</th>
                                <th>User Id</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((order) => (
                                    <tr key={order.order_id}>
                                        <td>{order.order_id}</td>
                                        <td>{order.user.user_id}</td>
                                        <td>{order.total}</td>
                                        <td>{order.status}</td>
                                        <td className='text-center'><CheckSquare onClick={(e) => { updateStatusHandler(e, order.user.user_id, order.order_id) }} style={{ cursor: 'pointer' }} color='green' size={20} /> </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                    :
                    <h4 className='text-center my-5'>No Orders To Manage</h4>
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

export default ManageOrderBody