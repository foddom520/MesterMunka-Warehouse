import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Itt jönne a bejelentkezési logika (API hívás, validáció stb.)
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row>
        <Col>
          <Card style={{ width: "22rem" }} className="shadow">
            <Card.Body>
              <Card.Title className="text-center mb-4">Log In</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email cím</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Add meg az email címed"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Jelszó</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Add meg a jelszavad"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button variant="dark" type="submit" className="w-100">
                  Bejelentkezés
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
