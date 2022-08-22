import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import Rating from './Rating';

export default function Product(props) {
  const { product } = props;
  return (
    <div>
      <Card sm={6} md={4} lg={3} className="mb-3">
        <Link to={`/product/${product.slug}`}>
          <Card.Img
            variant="top"
            src={product.image}
            className="card-image-top"
            alt={product.slug}
          />
        </Link>
        <div className="product-info">
          <Link to={`/product/${product.slug}`}>
            <p>{product.name}</p>
          </Link>
          <Rating numReviews={product.numReviews} rating={product.rating} />
        </div>
        <Card.Body>
          <Card.Text>
            <strong>${product.price}</strong>
          </Card.Text>
          <Button variant="primary">Add to Cart</Button>
        </Card.Body>
      </Card>
    </div>
  );
}
