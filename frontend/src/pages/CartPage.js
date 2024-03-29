import React, {useEffect} from 'react'
import {Link, useNavigate, useParams, useLocation} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, Image, Form, Button, Card } from "react-bootstrap";
import  Message  from '../components/Message'
import { addToCart, removeFromCart } from "../actions/cartActions";

function CartScreen({ match, location }){


     match = useParams();
     const productId = match.id

    const navigate = useNavigate()

     location = useLocation()
    const quantity = location.search ? Number(location.search.split('=')[1]) : 1

     console.log('quantity :', quantity )

    const dispatch = useDispatch()
    //console.log(productId)
    const cart = useSelector(state => state.cart)
    const { cartItems } = cart
    console.log(cartItems.countInStock)

    useEffect(() => {
        if(productId){
            dispatch(addToCart(productId, quantity))
        }
    }, [dispatch, productId, quantity])

    const removeFromCartHandler = (id) => {
       dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
         navigate("/shipping")
    }

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
                                        <Image src={item.image} alt={item.name} fluid rounded/>
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </Col>

                                    <Col md={2}>
                                        {item.price} FCFA
                                    </Col>

                                    <Col md={3}>
                                        <Form.Control
                                            as="select"
                                            value={item.qty}
                                            onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                                        >
                                            {
                                                [...Array(item.countInStock).keys()].map((x) =>(
                                                    <option key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                ))

                                            }
                                        </Form.Control>

                                    </Col>
                                    <Col md={1}>
                                        <Button
                                            type="button"
                                            variant="light"
                                            onClick={() => removeFromCartHandler(item.product)}
                                        >
                                            <i className="fas fa-trash"></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))

                        }
                    </ListGroup>
                )}
            </Col>
            <Col md={4}>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <h1>SUBTOTAL ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h1>
                        {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}  FCFA

                    </ListGroup.Item>
                </ListGroup>

                <ListGroup.Item>
                    <Button
                        type="button"
                        className="btn-block"
                        disabled={cartItems.length === 0}
                        onClick={checkoutHandler}
                    >
                        Proceed to Checkout
                    </Button>
                </ListGroup.Item>
            </Col>
        </Row>
    )
}

export default CartScreen