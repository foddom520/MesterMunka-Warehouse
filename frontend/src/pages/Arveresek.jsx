import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Button, Card, Row, Col, Alert, Spinner } from "react-bootstrap";
import backgroundimage from "../kepek/HomePageBackGround.png";

const Arveresek = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      setError("");
      setLoading(true);
      try {
        const res = await fetch("http://localhost:3000/arveres");
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || "Hiba történt");
        }
        const data = await res.json();
        setItems(data);
      } catch (e) {
        setError(e?.message || "Nem sikerült betölteni az árveréseket.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const formatDate = (value) => {
    if (!value) return "";
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return String(value);
    return d.toLocaleString("hu-HU");
  };

  return (
    <div className="text-center py-5 background-Image-custom">
      <Container>
        <h1 className="mb-4">Árverések</h1>

        {loading && (
          <div className="d-flex justify-content-center my-4">
            <Spinner />
          </div>
        )}

        {error && <Alert variant="danger">{error}</Alert>}

        {!loading && !error && items.length === 0 && (
          <Alert variant="secondary">Nincs megjeleníthető árverés.</Alert>
        )}

        <Row className="g-4 justify-content-center">
          {items.map((x) => (
            <Col key={`${x.arveresId}-${x.raktarId}`} xs={12} sm={6} md={4} lg={3}>
              <Card className="h-100 shadow">
                <Card.Img variant="top" src={backgroundimage} />
                <Card.Body className="d-flex flex-column">
                  <Card.Title>Árverés #{x.arveresId}</Card.Title>
                  <Card.Text className="text-start">
                    <div><b>Raktár ID:</b> {x.raktarId}</div>
                    <div><b>Időpont:</b> {formatDate(x.idopont)}</div>
                  </Card.Text>

                  <Button
                    variant="primary"
                    className="mt-auto"
                    onClick={() => {
                      console.log("Open auction:", x.arveresId);
                    }}
                  >
                    Megnyitás
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Arveresek;