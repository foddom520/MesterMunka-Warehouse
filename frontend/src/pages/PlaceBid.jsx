import React from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const PlaceBid = () => {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="4">
          <h2>Árverésre jelentkezés</h2>
          <Form>
            <Form.Group controlId="formBasicName">
              <Form.Label>Név</Form.Label>
              <Form.Control type="text" placeholder="Add meg a neved" />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email cím</Form.Label>
              <Form.Control type="email" placeholder="Add meg az email címed" />
            </Form.Group>

            <Form.Group controlId="formBasicPhone">
              <Form.Label>Telefonszám</Form.Label>
              <Form.Control type="text" placeholder="Add meg a telefonszámod" />
            </Form.Group>

            

            <Button variant="primary" type="submit" style={{ marginTop: '10px' }}>
              Jelentkezés
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default PlaceBid;
