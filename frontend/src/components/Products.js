import React from 'react';
import {Col,Card, Container, Row} from "react-bootstrap";

function Products({ product }) {
    return (
        <Card className="my-3 p-3 rounded">
            <a href={`/product/${product._id}`}>
                <Card.Img variant="top" src={product.image} />
            </a>

            <Card.Body>
                <a href="">
                    <Card.Title as="div">
                        <strong>{product.name}</strong>
                    </Card.Title>
                </a>
                <Card.Text as="div">
                    <div className="my-3">
                        {product.rating} from {product.numReviews} reviews
                    </div>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Products;