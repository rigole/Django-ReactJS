import React,  {useEffect, useState} from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import { Form, Button, Row, Col  } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import Loader from '../components/Loader'
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import {login, register} from "../actions/userActions";



function RegisterScreen(){

    const location = useLocation()
     const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userRegister = useSelector(state => state.userRegister)
    const { error, loading, userInfo } = userRegister

    useEffect(() => {
        if(userInfo){
            navigate("/login")
        }
    }, [navigate, userInfo, redirect])


    const submitHandler = (e) => {
        if (password !== confirmPassword){
            setMessage("Passwords do not match ")
        }

        e.preventDefault()
        dispatch(register(name, email, password))
    }

    return (
        <FormContainer>
            <h1>Register</h1>
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
                        required
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
                        required
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Button type="submit" variant="primary">
                    Sign Up
                </Button>
            </Form>

            <Row className="py-3">
                <Col>
                    Have an Account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}
                >
                    Sign In
                        </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen