import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card, Alert, Spinner } from "react-bootstrap";
import { FaClock, FaUsers, FaTrophy, FaGavel, FaSearch, FaBell, FaUser, FaHeart, FaShare, FaTag } from 'react-icons/fa';  

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Email: email, Jelszo: password }),
      });

      let data = null;
      const contentType = res.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        data = await res.json();
      } else {
        const text = await res.text();
        data = { message: text };
      }

      if (!res.ok) {
        setError(data?.message || "Hiba történt a bejelentkezésnél.");
        return;
      }

      setSuccess(data?.message || "Sikeres bejelentkezés!");
    } catch (err) {
      setError("Nem sikerült csatlakozni a szerverhez. (Backend fut?)");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row>
        <Col>
          <Card style={{ width: "22rem" }} className="shadow">
            <Card.Body>
              <Card.Title className="text-center mb-4">Log In</Card.Title>

              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}

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

                <Button variant="dark" type="submit" className="w-100" disabled={loading}>
                  {loading ? (
                    <>
                      <Spinner size="sm" className="me-2" />
                      Bejelentkezés...
                    </>
                  ) : (
                    "Bejelentkezés"
                  )}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </>
  );
}

export default Login;