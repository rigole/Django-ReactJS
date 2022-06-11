import React, {useEffect} from 'react'
import {Link, useNavigate, useParams, useLocation} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, Image, Form, Button, Card } from "react-bootstrap";
import { Message } from '../components/Message'
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
        <div>
            Cart
        </div>
    )
}

export default CartScreen