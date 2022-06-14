import React, {useEffect} from 'react'
import {Link, useNavigate, useParams, useLocation} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, Image, Form, Button, Card } from "react-bootstrap";
import  Message  from '../components/Message'
import { addToCart } from "../actions/cartActions";

function CartScreen({ match, location }){


     match = useParams();
     const productId = match.id

     location = useLocation()
    const quantity = location.search ? Number(location.search.split('=')[1]) : 1

     console.log('quantity :', quantity )

    const dispatch = useDispatch()
    //console.log(productId)
    const cart = useSelector(state => state.cart)
    const { cartItems } = cart
    console.log(cartItems)

    useEffect(() => {
        if(productId){
            dispatch(addToCart(productId, quantity))
        }
    }, [dispatch, productId, quantity])



    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <div>
                        <Message variant="info"  message="Your cart is empty">

                        </Message>
                        <Link to="/">Go back</Link>
                    </div>

                ) : (
                    <ListGroup variant="flush">
                        {cartItems.map(item => (
                            <ListGroup.Item key={item.product}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} />
                                    </Col>
                                    <Col md={3}>
                                        <Link to={``}>{item.name}</Link>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))

                        }
                    </ListGroup>
                )}
            </Col>
            <Col md={4}>

            </Col>
        </Row>
    )
}

export default CartScreen