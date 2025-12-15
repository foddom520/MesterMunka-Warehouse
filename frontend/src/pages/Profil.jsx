import React from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";

const Profil = () => {
  return (
    <Container className="mt-4">
      {/* Fejléc */}
      <Row className="mb-4">
        <Col className="text-center">
          <img
            src="https://via.placeholder.com/120"
            alt=" saját Profil kép"
            className="rounded-circle mb-2"
          />
          <h2>saját név</h2>
          <p className="text-muted">saját email</p>
        </Col>
      </Row>

      {/* Saját adatok */}
      <Row>
        <Col md={6}>
          <Card className="mb-3">
            <Card.Header>Saját adatok</Card.Header>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Név</Form.Label>
                  <Form.Control type="text" defaultValue="Gergő" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" defaultValue="gergo@example.com" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Telefon</Form.Label>
                  <Form.Control type="text" defaultValue="+36 30 123 4567" />
                </Form.Group>
                <Button variant="primary">Mentés</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* Beállítások */}
        <Col md={6}>
          <Card className="mb-3">
            <Card.Header>Beállítások</Card.Header>
            <Card.Body>
              <Form>
                <Form.Check type="switch" label="Sötét mód" />
                <Form.Check type="switch" label="Email értesítések" defaultChecked />
                <Form.Check type="switch" label="Push értesítések" />
                <Button variant="primary" className="mt-3">Mentés</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Biztonság */}
      <Row>
        <Col>
          <Card>
            <Card.Header>Biztonság</Card.Header>
            <Card.Body>
              <Button variant="secondary" className="me-2">Jelszó módosítása</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profil;
