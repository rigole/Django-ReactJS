import React, {useState, useEffect} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import  products  from "../products";
//import Products from "../components/Products";
import axios from 'axios';



function HomeScreen() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        async function fetchProducts() {
            const { data } = axios.get('http://127.0.01:8000/api/products/')
            setProducts(data)
        }

        fetchProducts()

    }, [])
    return (
        <div>
            <h1>Latest Products</h1>
            <Row>
                {products.map(product => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                      <Products product={product}/>
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default HomeScreen;