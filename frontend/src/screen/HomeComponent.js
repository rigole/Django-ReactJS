import React, {useState, useEffect} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import  { listProducts } from "../actions/productAction";
import Products from "../components/Products";
import Loader from "../components/Loader";
import Message from "../components/Message";
import axios from 'axios';



function HomeComponent() {
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
     const { error, loading, products } = productList;

    /*const [products, setProducts] = useState([])
    async function fetchProducts() {
        axios.get('/api/products/')
            .then((response) => {
                const products = response.data
                setProducts(products);
            })

    }*/

    useEffect(() => {
       // fetchProducts()
        dispatch(listProducts())
    }, [dispatch])

    //const products = []

    return (
        <div>
            <h1>Latest Courses</h1>

            {loading ? <Loader/>
                : error ? <Message variant="danger"> { error }</Message>
                    :
                    <Row>
                        {products.map(product => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Products product={product}/>
                            </Col>
                        ))}
                    </Row>
            }
        </div>
    )
}

export default HomeComponent;