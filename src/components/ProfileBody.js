import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Container, Image } from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'


const ProfileBody = () => {
    
    const navigate = useNavigate()
    const initialValues = {
        first_name : "",
        last_name : "",
        gender : "",
        mobile_no: "",
        email_id : "",
        address : "",
        state : "",
        city : "",
        street : "",
        zip_code : ""
    }

    const [userId, setUserId] = useState(0)
    const [data, setData] = useState(initialValues)

    const clickHandler = (e,details) => {
        e.preventDefault()
        navigate('/updateProfile', {
            state: {
                details
            }
        })
    }

    const getUserId = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/getSession`)
            console.log(response.data)
            setUserId(response.data)

            getUserDetails()
        }
        catch (error) {
            console.log(error)
        }
    }

    const getUserDetails = async() => {
        try {
            if(userId !== 0)
            {
                console.log(userId)
                const response = await axios.get(`http://localhost:8080/getUser/${userId}`)
                console.log(response.data)
                setData(response.data)
            }
        }
        catch (error) {
            console.error(error)
        }

    }

    const getSession = async () => {
        const response = await axios.get(`http://localhost:8080/getSession`)
        if(response.data === 0){
            navigate('/login')
        }
    }

    useEffect(() => {
        getSession()
        getUserId()
    }, [userId])

    return (
        <div>
            <h3 className='text-center my-3'>My Profile</h3>
            <Container className='text-center my-3' style={{ fontWeight: '700' }}>
                <Image width={150} src='https://p.kindpng.com/picc/s/21-211456_user-icon-hd-png-download.png' />
                <br />
                <label className='m-2'>Name: </label>{data.first_name + " " + data.last_name}
                <br />
                <label className='m-2'>Gender: </label>{data.gender}
                <br />
                <label className='m-2'>Mobile No: </label>{data.mobile_no}
                <br />
                <label className='m-2'>Email Id: </label>{data.email_id}
                <br />
                <label className='m-2'>Address: </label>{data.address}
                <br />
                <label className='m-2'>State: </label>{data.state}
                <br />
                <label className='m-2'>City: </label>{data.city}
                <br />
                <label className='m-2'>Street: </label>{data.street}
                <br />
                <label className='m-2'>Zip Code: </label>{data.zip_code}
                <br />
                <Button onClick={(e) => clickHandler(e,data)} className='m-2'>Update</Button>
            </Container>
        </div>
    )
}

export default ProfileBody