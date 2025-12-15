import React from "react";
import { Container, Row, Col, Card, Button, ListGroup } from "react-bootstrap";

const Profil = () => {
  
  const user = {
    name: "Gergő",
    email: "gergo@example.com",
    phone: "+36 30 123 4567",
    joined: "2024-05-10",
  };

  return (
    <Container className="mt-4">
      {/* Fejléc */}
      <Row className="mb-4">
        <Col className="text-center">
          <img
            src="https://via.placeholder.com/120"
            alt="Profil kép"
            className="rounded-circle mb-2"
          />
          <h2>{user.name}</h2>
          <p className="text-muted">{user.email}</p>
          <Button variant="outline-primary" size="sm">
            Profilkép módosítása
          </Button>
        </Col>
      </Row>

      {/* Saját adatok */}
      <Row>
        <Col md={6}>
          <Card className="mb-3">
            <Card.Header>Saját adatok</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item><strong>Név:</strong> {user.name}</ListGroup.Item>
              <ListGroup.Item><strong>Email:</strong> {user.email}</ListGroup.Item>
              <ListGroup.Item><strong>Telefon:</strong> {user.phone}</ListGroup.Item>
              <ListGroup.Item><strong>Csatlakozott:</strong> {user.joined}</ListGroup.Item>
            </ListGroup>
            <Card.Body>
              <Button variant="primary">Adatok szerkesztése</Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Beállítások */}
        <Col md={6}>
          <Card className="mb-3">
            <Card.Header>Beállítások</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item><strong>Téma:</strong> Világos mód</ListGroup.Item>
              <ListGroup.Item><strong>Értesítések:</strong> Email értesítések engedélyezve</ListGroup.Item>
            </ListGroup>
            <Card.Body>
              <Button variant="primary">Beállítások módosítása</Button>
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
              <Button variant="secondary">Kétlépcsős azonosítás</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profil;
