import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import Rating from './Rating';
import { Store } from '../Store';
import axios from 'axios';

export default function Product(props) {
  const [productQuantity, setProductQuantity] = useState();
  const { product } = props;
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;
  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((y) => y._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    setProductQuantity(quantity);
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock <= quantity) {
      window.alert('Product Not Found');
    }
    ctxDispatch({
      type: 'CARD_ADD_ITEM',
      payload: { ...product, quantity },
    });
  };
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
          {product.countInStock <= productQuantity ? (
            <Button variant="light" disabled onClick={() => addToCartHandler()}>
              Out Of Stock
            </Button>
          ) : (
            <Button
              variant="primary"
              type="button"
              onClick={() => addToCartHandler()}
            >
              Add to Cart
            </Button>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}
