import React,  {useEffect, useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import { Form, Button} from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutStepsComponent from "../components/CheckoutStepsComponent";
import { saveShippingAddress } from "../actions/cartActions";


function ShippingPage(){

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)
    
    
    const submitHandler = (e) => {
      e.preventDefault()
        console.log("submitted")
        dispatch(saveShippingAddress({ address, city, postalCode, country }))
        navigate("/payment")
    }

    return (
        <FormContainer>
            <CheckoutStepsComponent/>
            <h1>Shipping Address</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='address'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        required
                        type='name'
                        placeholder="Enter address"
                        value={ address ? address : ''}
                        onChange={(e) =>setAddress(e.target.value)}
                    ></Form.Control>
                </Form.Group>


                <Form.Group controlId='city'>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        required
                        type='name'
                        placeholder = "Enter City"
                        value={ city ? city : ''}
                        onChange={(e) =>setCity(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='postalCode'>
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                        required
                        type='name'
                        placeholder = "Enter Postal Code"
                        value={ postalCode ? postalCode : ''}
                        onChange={(e) =>setPostalCode(e.target.value)}
                    ></Form.Control>
                </Form.Group>


                <Form.Group controlId='country'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        required
                        type='name country'
                        value={ country ? country : ''}
                        onChange={(e) =>setCountry(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}
export default ShippingPage