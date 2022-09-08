import React,  {useEffect, useState} from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import { Form, Button, Row, Col, Table  } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import Loader from '../components/Loader'
import Message from "../components/Message";
import { LinkContainer } from "react-router-bootstrap";
import {getUserDetails, updateUserProfile} from "../actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import { listMyOrders } from "../actions/orderActions";


function ProfilePage(){


    const location = useLocation()
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    //const redirect = location.search ? location.search.split('=')[1] : '/'

    const userDetails = useSelector(state => state.userDetails)
    const { error, loading, user } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    const listMyOrder = useSelector(state => state.orderList)
    const { loading:loadingOrders, error:errorOrders, orders } = listMyOrder


    useEffect(() => {
        if(!userInfo){
            navigate("/login")
        } else {
            if(!user || !user.name || success){
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders)

            }else{
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch,navigate, userInfo,user, success])


    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage("Passwords do not match ")
        } else {
            dispatch(updateUserProfile({
                'id': user.id,
                'name': name,
                'email': email,
                'password': password
            }))
        }


       // dispatch(register(name, email, password))
    }
    console.log(orders)

    return (
        <Row>
            <Col md={3}>
                <h1>User Profile</h1>

                {message && <Message variant='danger' message={message}/>}
                {error && <Message variant="danger" message={error}/>}
                {loading && <Loader/>}
                <Form onSubmit={submitHandler}>

                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            required
                            type='text'
                            placeholder='Enter Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>


                    <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            required
                            type='email'
                            placeholder='Enter Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>


                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Enter Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>


                    <Form.Group controlId='confirmPassword'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Confirm Password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Button type="submit" variant="primary">
                        Update
                    </Button>
                </Form>
            </Col>

            <Col md={9}>
                <h1>My orders</h1>
                {loadingOrders ? (
                    <Loader/>
                ) : errorOrders ? (
                    <Message message={errorOrders} variant="danger"/>
                ) : (
                    <Table striped responsive className="table-sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Paid</th>
                                <th>Delivered</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                        {orders.map(order => (
                            <tr>
                                <td>{order._id}</td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>{order.totalPrice}</td>
                                <td>{order.isPaid ? order.paidAt : (
                                    <i className="fa fa-times" style={{ color: "red" }}></i>
                                )}</td>
                                <td>
                                    <LinkContainer to={`/order/${order._id}`}>
                                        <Button className="btn-sm">Details</Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        ))}
                        </tbody>

                    </Table>
                )}
            </Col>
        </Row>
    )
}

export default ProfilePage