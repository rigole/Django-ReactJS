import React, {useState} from 'react'
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "./FormContainer";
import { useLocation, useNavigate } from 'react-router-dom'
import CheckoutStepsComponent from "./CheckoutStepsComponent";

import { savePaymentMethod } from '../actions/cartActions'


function PaymentComponent() {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate("/placeorder")
    }



    if (!shippingAddress.address){
        navigate("/shipping")
    }

    return(
        <FormContainer>
            <CheckoutStepsComponent step1 step2 step3 step4/>

            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>
                    <Col>
                        <Form.Check
                            type='radio'
                            label='PayPal or Credit Card'
                            id=''
                            name='paymentMethod'
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >


                        </Form.Check>
                    </Col>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}
export default PaymentComponent