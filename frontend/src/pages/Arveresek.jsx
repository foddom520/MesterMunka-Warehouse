import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Button, Card, Row, Col, Alert, Spinner, Badge } from "react-bootstrap";
import { FaClock, FaCalendarCheck } from 'react-icons/fa';
import backgroundimage from "../kepek/HomePageBackGround.png";
import { useNavigate } from "react-router-dom";

const Arveresek = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      setError("");
      setLoading(true);
      try {
        const res = await fetch("http://localhost:3000/arveres");
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || "Hiba történt az adatok lekérésekor.");
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
    if (!value) return "Nincs megadva";
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return String(value);
    return d.toLocaleString("hu-HU");
  };

  // Szétválogatás: Aktív és Lejárt licitek
  const now = new Date();
  const activeAuctions = items.filter(item => new Date(item.idopont) > now);
  const expiredAuctions = items.filter(item => new Date(item.idopont) <= now);

  // Segédfüggvény a kártyák kirajzolásához, hogy ne kelljen kétszer leírni ugyanazt a kódot
  const renderAuctionCard = (auction, isExpired) => (
    <Col lg={4} md={6} key={auction.id} className="mb-4">
      <Card className={`auction-card h-100 ${isExpired ? "opacity-75" : ""}`}>
        <div className="card-image-container">
          <Card.Img variant="top" src={backgroundimage} />
          <Badge bg={isExpired ? "secondary" : "info"} className="category-badge">
            {isExpired ? "Lejárt" : (auction.category || "Egyéb")}
          </Badge>
        </div>
        <Card.Body className="d-flex flex-column">
          <Card.Title>{auction.title || `Árverés #${auction.id}`}</Card.Title>
          
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="text-start">
              <h5 className={isExpired ? "text-secondary mb-0" : "text-primary mb-0"}>
                {auction.currentBid?.toLocaleString() || "0"} Ft
              </h5>
              <small className="text-muted">{isExpired ? "Végső ár" : "Jelenlegi licit"}</small>
            </div>
            <div className="text-end">
              <div className="d-flex align-items-center small">
                {isExpired ? <FaCalendarCheck className="me-1" /> : <FaClock className="me-1" />}
                <span>{formatDate(auction.idopont)}</span>
              </div>
            </div>
          </div>

          {!isExpired ? (
            <Button 
              variant="outline-primary" 
              className="w-100 mt-auto"
              onClick={() => navigate(`/arveresinfo/${auction.id}`)}
            >
              Licitálás
            </Button>
          ) : (
            <Button variant="secondary" className="w-100 mt-auto" disabled>
              Az árverés lezárult
            </Button>
          )}
        </Card.Body>
      </Card>
    </Col>
  );

  return (
    <div className="text-center py-5 background-Image-custom">
      <Container>
        <h1 className="mb-4" style={{ color: "white" }}>Árverések</h1>

        {loading && (
          <div className="d-flex justify-content-center my-4">
            <Spinner animation="border" variant="light" />
          </div>
        )}

        {error && <Alert variant="danger">{error}</Alert>}

        {!loading && !error && items.length === 0 && (
          <Alert variant="secondary">Nincs megjeleníthető árverés.</Alert>
        )}

        {!loading && !error && items.length > 0 && (
          <>
            {/* Aktív árverések szekció */}
            <h3 className="mb-4 text-start" style={{ color: "white" }}>Aktív Árverések</h3>
            <Row className="mb-5">
              {activeAuctions.length > 0 ? (
                activeAuctions.map(auction => renderAuctionCard(auction, false))
              ) : (
                <Col><p className="text-white-50">Jelenleg nincs aktív árverés.</p></Col>
              )}
            </Row>

            {/* Lejárt árverések szekció */}
            <h3 className="mb-4 text-start" style={{ color: "white" }}>Lejárt Árverések</h3>
            <Row>
              {expiredAuctions.length > 0 ? (
                expiredAuctions.map(auction => renderAuctionCard(auction, true))
              ) : (
                <Col><p className="text-white-50">Nincs lejárt árverés.</p></Col>
              )}
            </Row>
          </>
        )}
      </Container>
    </div>
  );
};

export default Arveresek;