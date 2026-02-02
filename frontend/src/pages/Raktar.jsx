import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Card, Alert, Spinner, Badge} from "react-bootstrap";

const Raktar = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      setError("");
      setLoading(true);

      try {
        const res = await fetch("http://localhost:3000/raktar");

        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || "Server error");
        }

        const data = await res.json();
        setItems(Array.isArray(data) ? data : []);
      } catch (e) {
        setError(e?.message || "Nem sikerült betölteni a raktárakat.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const formatDate = (value) => {
    if (!value) return "-";
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return String(value);
    return d.toLocaleDateString("hu-HU");
  };

  return (
    <>
    <div className="text-center py-5 background-Image-custom">
      <Container>
        <h1 className="mb-3" style={{ color: "white"}}>Raktárak</h1>
        <p className="lead" style={{ color: "white"}}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit...
        </p>

        {loading && (
          <div className="d-flex justify-content-center my-4">
            <Spinner />
          </div>
        )}

        {error && <Alert variant="danger">{error}</Alert>}

        {!loading && !error && items.length === 0 && (
          <Alert variant="secondary">Nincs megjeleníthető raktár.</Alert>
        )}

        <Row className="g-4 mt-1">
          {items.map((row, idx) => {
            const raktarSzama = row["raktár száma"];
            const foglalt = row["foglaltság"];
            const hatarido = row["határidő"];

            return (
              <Col key={raktarSzama ?? idx} xs={12} sm={6} md={4} lg={3}>
                <Card className="h-100 shadow">
                  <Card.Body className="d-flex flex-column text-start">
                    <Card.Title className="d-flex justify-content-between align-items-center">
                      <span>Raktár #{raktarSzama}</span>
                      <Badge bg={foglalt ? "danger" : "success"}>
                        {foglalt ? "Foglalt" : "Szabad"}
                      </Badge>
                    </Card.Title>

                    <Card.Text className="mt-2 mb-0">
                      <b>Határidő:</b> {formatDate(hatarido)}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
    </>
  );
};

export default Raktar;
