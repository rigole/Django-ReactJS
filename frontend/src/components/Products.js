import React from 'react';
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from './Rating';

function Products({ product }) {
    return (
        <Card className="my-3 p-3 rounded">
            <Link to={`/product/${product._id}`}>
                <Card.Img variant="top" src={product.image} />
            </Link>

            <Card.Body>
                <Link to="">
                    <Card.Title as="div">
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>
                <Card.Text as="div">
                    <div className="my-3">
                        <Rating value={product.rating} text={`${product.numReviews}  reviews`} color={'#f8e825'}/>
                    </div>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Products;