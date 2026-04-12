import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Card, Alert, Spinner, Badge } from "react-bootstrap";
import { FaMapMarkerAlt, FaCalendarAlt, FaWarehouse } from "react-icons/fa";

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
          throw new Error(text || "Hiba történt a szerverrel való kommunikáció során.");
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
    if (!value) return "Nincs megadva";
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return String(value);
    return d.toLocaleDateString("hu-HU");
  };

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Raktárkészlet Áttekintés</h2>
        <Badge bg="dark" className="p-2">Összesen: {items.length} egység</Badge>
      </div>

      {loading && (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-2">Adatok betöltése...</p>
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && items.length === 0 && (
        <Alert variant="info">Jelenleg nincs rögzített raktár az adatbázisban.</Alert>
      )}

      <Row>
        {!loading && items.map((row, idx) => {
          // A változókat a frissített SQL oszlopnevekhez igazítjuk
          const raktarSzama = row.raktarSzama; 
          const foglalt = row.foglalt;
          const hatarido = row.hatarido;
          const iranyitoszam = row.Iranyitoszam;
          const utca = row.Utca;
          const hazszam = row.Hazszam;

          return (
            <Col key={row.id || idx} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Card className="h-100 shadow-sm border-0">
                <Card.Body className="d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div className="d-flex align-items-center">
                      <FaWarehouse className="text-primary me-2" />
                      <h5 className="mb-0">Raktár #{raktarSzama}</h5>
                    </div>
                    <Badge bg={foglalt ? "danger" : "success"}>
                      {foglalt ? "Foglalt" : "Szabad"}
                    </Badge>
                  </div>

                  <Card.Text className="text-muted small flex-grow-1">
                    <FaMapMarkerAlt className="me-1" />
                    {iranyitoszam} {utca} {hazszam}.
                  </Card.Text>

                  <hr className="my-2 opacity-25" />

                  <Card.Text className="small mb-0">
                    <FaCalendarAlt className="me-2 text-secondary" />
                    <strong>Határidő:</strong> {formatDate(hatarido)}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default Raktar;