import React, { useContext } from 'react';
import {
  Button,
  Card,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import MsgBox from '../components/MsgBox';
import { Store } from '../Store';

export default function CartScreen() {
  let navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const updateCartHandler = (Item, quantity) => {
    if (Item.countInStock <= quantity) {
      window.alert('Product Not Found');
    }
    ctxDispatch({
      type: 'CARD_ADD_ITEM',
      payload: { ...Item, quantity },
    });
  };
  const removeItemHandler = (Item) => {
    ctxDispatch({
      type: 'REMOVE_CART_ITEM',
      payload: Item,
    });
  };

  const checkOutHandler = () => {
    navigate('/signIn?redirect=/signIn');
  };
  return (
    <div>
      <h1>Shopping Cart</h1>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <MsgBox>
              Cart is Empty <Link to="/">Go Shopping</Link>
            </MsgBox>
          ) : (
            <ListGroup>
              {cartItems.map((Item) => (
                <ListGroup.Item key={Item._id}>
                  <Row className="align-items-center">
                    <Col md={4}>
                      <img
                        src={Item.image}
                        alt={Item.name}
                        className="img-fluid-rounded image-thumbnail"
                      />
                      <Link to={`/product/${Item.slug}`}>{Item.name}</Link>
                    </Col>
                    <Col md={3}>
                      <Button
                        variant="light"
                        disabled={Item.quantity === 1}
                        onClick={() =>
                          updateCartHandler(Item, Item.quantity - 1)
                        }
                      >
                        <i className="bi bi-dash-circle-fill"></i>
                      </Button>{' '}
                      <span>{Item.quantity}</span>{' '}
                      <Button
                        variant="light"
                        disabled={Item.countInStock <= Item.quantity}
                        onClick={() =>
                          updateCartHandler(Item, Item.quantity + 1)
                        }
                      >
                        <i className="bi bi-plus-circle-fill"></i>
                      </Button>
                    </Col>
                    <Col md={3}>{Item.price}</Col>
                    <Col md={2}>
                      <i
                        className="bi bi-trash-fill"
                        onClick={() => removeItemHandler(Item)}
                      ></i>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <h3>
                    Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                    Item):
                    <p>
                      <h3>
                        {' '}
                        $ (
                        {cartItems.reduce(
                          (a, c) => a + c.quantity * c.price,
                          0
                        )}{' '}
                      </h3>
                    </p>
                  </h3>
                </ListGroupItem>
              </ListGroup>
              <ListGroupItem>
                <Button
                  type="button"
                  className="CheckOutBtn"
                  disabled={cartItems.length === 0}
                  onClick={() => checkOutHandler()}
                >
                  Proceed to Checkout
                </Button>
              </ListGroupItem>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
