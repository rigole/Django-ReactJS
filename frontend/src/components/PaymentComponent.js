import React from 'react'
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "./FormContainer";
import {useLocation, useNavigate} from 'react-router-dom'
import CheckoutStepsComponent from "./CheckoutStepsComponent";
//import { savePaymentMethod } from '../actions/cartActions'


function PaymentComponent() {

    const cart = useSelector(state => state.cart)
    const { shipAddress } = cart
    const navigate = useNavigate()
    return(
        <>
        </>
    )
}
export default PaymentComponent