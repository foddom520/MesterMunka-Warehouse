import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";

function Registration() {
  const [vnev, setVnev] = useState("");
  const [knev, setKnev] = useState("");
  const [felhasznalonev, setFelhasznalonev] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log("Vnev:", vnev);
    console.log("Knev:", knev);
    console.log("FelhasznaloNev:", felhasznalonev);
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row>
        <Col>
          <Card style={{ width: "22rem" }} className="shadow">
            <Card.Body>
              <Card.Title className="text-center mb-4">Registration</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicVnev">
                  <Form.Label>Vezeték név</Form.Label>
                  <Form.Control
                    type="vnev"
                    placeholder="Add meg a vezeték neved"
                    value={vnev}
                    onChange={(e) => setVnev(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicKnev">
                  <Form.Label>kereszt név</Form.Label>
                  <Form.Control
                    type="knev"
                    placeholder="Add meg a kereszt neved"
                    value={knev}
                    onChange={(e) => setKnev(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicKnev">
                  <Form.Label>felhasználónév</Form.Label>
                  <Form.Control
                    type="felhasznalonev"
                    placeholder="Add meg a felhasználóneved"
                    value={felhasznalonev}
                    onChange={(e) => setFelhasznalonev(e.target.value)}
                    required
                  />
                </Form.Group>

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
                  Regisztráció
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Registration;
