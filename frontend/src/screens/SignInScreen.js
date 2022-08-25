import React from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useLocation } from 'react-router-dom';

export default function SignInScreen() {
  let { search } = useLocation();
  const searches = new URLSearchParams(search);
  const redirectInUrl = searches.get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  console.log(redirect);

  return (
    <div>
      <Container className="small-container">
        <h1>Sign In</h1>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="formBasicCheckbox"
          ></Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
          <div>
            <br />
            <span>New Customer? </span>
            <Link to={`/signup?redirect=${redirect}`}>Create Your Account</Link>
          </div>
        </Form>
      </Container>
    </div>
  );
}
