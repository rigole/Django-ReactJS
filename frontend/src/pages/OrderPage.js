import React, { useState, useEffect } from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { Link, useNavigate, useParams,  } from "react-router-dom";
import Message  from "../components/Message";
import  match  from "react-router-dom";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
//import FormContainer from "../components/FormContainer";
import { getOrderDetails } from "../actions/orderActions";
//import { ORDER_CREATE_RESET } from "../constants/orderConstant";

function OrderPage() {
    const match =  useParams()
    const orderId = match.id
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const orderDetails = useSelector(state => state.orderDetails)
    const { order, error, loading  } = orderDetails

    const address = cart.shippingAddress.address;
    const city = cart.shippingAddress.city
    const postalCode = cart.shippingAddress.postalCode
    const country = cart.shippingAddress.country

    if(!loading && !error){
        order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    }


//Tafo!W2022
    useEffect(() => {
        if (!order || order._id !== Number(orderId)){
            dispatch(getOrderDetails(orderId))

        }
    }, [order, orderId])






         return loading ? (
              <Loader/>
          ) : error ? (
              <Message variant='danger' message={error}/>
              )
         : (
            <div>
                <h1>Order {order._id}</h1>
                <Row>
                    <Col md={8}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Shipping</h2>
                                <p><strong>Name: </strong>{userInfo.name}</p>
                                <p><strong>Email: </strong> <a href={`mailto:${userInfo.email}`}> {userInfo.email}</a></p>
                                <p>
                                    <strong>Shipping:</strong>
                                    {address}, {city}
                                    {'  '}
                                    {postalCode},
                                    {' '}
                                    {country},
                                </p>

                                {order.isDelivered ? (
                                    <Message variant="success" message={`Delivered on ${order.deliveredAt}`}/>
                                ) :(
                                    <Message variant="warning" message={`Not yet delivered`}/>
                                )}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <h2>Payment Method</h2>
                                <p>
                                    <strong>Method:</strong>
                                    {order.paymentMethod}
                                </p>
                                {order.isPaid ? (
                                  <Message variant="success" message={`Paid on ${order.paidAt}`}/>
                                ): (
                                    <Message variant="warning" message="Not yet Paid"/>
                                )}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <h2>Order Items</h2>
                                {order.orderItems.length === 0 ? <Message variant='info' message=' Your cart is empty'/>
                                    : (
                                        <ListGroup variant='flush'>
                                            {order.orderItems.map((item, index) => (
                                                <ListGroup.Item key={index}>
                                                    <Row>
                                                        <Col md={1}>
                                                            <Image src={item.image} alt={item.name} fluid rounded/>
                                                        </Col>

                                                        <Col>
                                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                        </Col>

                                                        <Col md={4}>
                                                            {item.qty} X ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            ))}
                                        </ListGroup>
                                    )

                                }
                            </ListGroup.Item>
                        </ListGroup>

                    </Col>
                    <Col md={4}>
                        <Card>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h2>Order Summary</h2>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>Items:</Col>
                                        <Col>${order.itemsPrice}</Col>
                                    </Row>
                                </ListGroup.Item>


                                <ListGroup.Item>
                                    <Row>
                                        <Col>Shipping:</Col>
                                        <Col>${order.shippingPrice}</Col>
                                    </Row>
                                </ListGroup.Item>


                                <ListGroup.Item>
                                    <Row>
                                        <Col>Tax:</Col>
                                        <Col>${order.taxPrice}</Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>Total:</Col>
                                        <Col>${order.totalPrice}</Col>
                                    </Row>
                                </ListGroup.Item>


                                <ListGroup.Item>
                                    {error && <Message variant='danger' message={error}/>}
                                </ListGroup.Item>




                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            </div>
        )

}

export default OrderPage