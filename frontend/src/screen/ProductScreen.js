import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Row, Col, Image, ListGroup, Button, Card,  Form } from "react-bootstrap";
import Rating from '../components/Rating'
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listProductDetails } from "../actions/productAction";
//import axios from "axios";
//import products from "../products";

function ProductScreen(  ) {
    const { id } = useParams()
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate()
    ///const [product, setProduct] = useState([])

        /*async function fetchProduct() {
            axios.get(`/api/products/${id}`)
        .then((response) => {
            const product = response.data
            //const productID = product.find((p) => p._id === (id))
            setProduct(product);
        })*/



    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails


        useEffect(() => {
          //  fetchProduct()
            dispatch(listProductDetails(id))
        }, [dispatch, id])

    const addToCart = () => {
        navigate(`/cart/${id}?qty=${quantity}`)
    }
    

    return(
        <div>
           <Link to="/" className="btn btn-light my-3">Go Back</Link>
            {loading ? <Loader/>
                : error
                    ? <Message variant="danger"> { error }</Message>
                : (
                        <Row>
                            <Col md={6}>
                                <Image src={product.image} alt={product.name} fluid/>
                            </Col>

                            <Col md={3}>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <h3>{product.name}</h3>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Rating value={product.rating} text={`${product.numReviews} Rating`} color={'#f8e825'}/>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        Price: ${product.price}
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        Description: {product.description}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                            <Col md={3}>
                                <Card>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Price:</Col>
                                                <Col>
                                                    <strong>${product.price}</strong>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Status:</Col>
                                                <Col>
                                                    {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>

                                        {product.countInStock > 0 && (
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Quantity</Col>
                                                    <Col xs="auto" className="my-1">
                                                        <Form.Control
                                                            as="select"
                                                            value={quantity}
                                                            onChange={(e) => setQuantity(e.target.value)}
                                                        >
                                                            {
                                                                [...Array(product.countInStock).keys()].map((x) =>(
                                                                    <option key={x + 1} value={x + 1}>
                                                                        {x + 1}
                                                                    </option>
                                                                ))
                                                            }
                                                        </Form.Control>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        )}

                                        <ListGroup.Item>
                                            <Button
                                                className="btn-block"
                                                onClick={addToCart}
                                                disabled={product.countInStock == 0}
                                                type="button"
                                            >
                                                Add to Cart
                                            </Button>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card>
                            </Col>
                        </Row>
                    )
            }


        </div>
    )
}

export default ProductScreen