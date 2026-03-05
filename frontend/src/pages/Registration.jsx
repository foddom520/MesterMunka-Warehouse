import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card, Alert, Spinner } from "react-bootstrap";

function Registration() {
  const [felhasznalonev, setFelhasznalonev] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("A jelszavak nem egyeznek!");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Felhasznalonev: felhasznalonev,
          Email: email,
          Jelszo: password,
        }),
      });

      const text = await res.text();

      if (!res.ok) {
        setError(text || "Regisztrációs hiba");
        return;
      }

      setSuccess(text || "Sikeres regisztráció!");
      setFelhasznalonev("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError("Nem sikerült csatlakozni a szerverhez.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row>
        <Col>
          <Card style={{ width: "22rem" }} className="shadow">
            <Card.Body>
              <Card.Title className="text-center mb-4">Registration</Card.Title>

              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formFelhasznaloNev">
                  <Form.Label>Felhasználónév</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Add meg a felhasználóneved"
                    value={felhasznalonev}
                    onChange={(e) => setFelhasznalonev(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email cím</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Add meg az email címed"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Jelszó</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Add meg a jelszavad"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPasswordConfirm">
                  <Form.Label>Jelszó megerősítése</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Erősítsd meg a jelszavad"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button variant="dark" type="submit" className="w-100" disabled={loading}>
                  {loading ? (
                    <><Spinner size="sm" className="me-2" />Regisztráció...</>
                  ) : ("Regisztráció")}
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