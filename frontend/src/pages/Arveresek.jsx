import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Button, Card, Row, Col, Alert, Spinner, Badge } from "react-bootstrap";
import { FaClock, FaUsers, FaTrophy, FaGavel, FaSearch, FaBell, FaUser, FaHeart, FaShare, FaTag } from 'react-icons/fa';
import backgroundimage from "../kepek/HomePageBackGround.png";

const Arveresek = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

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
    <>
    <div className="text-center py-5 background-Image-custom">
      <Container>
        <h1 className="mb-4" style={{ color: "white"}}>Árverések</h1>

        {loading && (
          <div className="d-flex justify-content-center my-4">
            <Spinner />
          </div>
        )}

        {error && <Alert variant="danger">{error}</Alert>}

        {!loading && !error && items.length === 0 && (
          <Alert variant="secondary">Nincs megjeleníthető árverés.</Alert>
        )}

        <Container className="my-5">
          <Row>
            <Col lg={9}>
              {/* Auctions Grid */}
              <h3 className="mb-4" style={{ color: "white"}}>Active Auctions</h3>
              <Row>
                {items.map((auction) => (
                  <Col lg={4} md={6} key={auction.arveresId} className="mb-4">
                    <Card className="auction-card h-100">
                      <div className="card-image-container">
                        <Card.Img variant="top" src={backgroundimage} />
                        <Button variant="light" className="wishlist-btn">
                          <FaHeart />
                        </Button>
                        <Badge bg="info" className="category-badge">
                          {auction.category || "N/A"}
                        </Badge>
                      </div>
                      <Card.Body>
                        <Card.Title className="d-flex justify-content-between">
                          {auction.title || `Auction #${auction.arveresId}`}
                          <Button variant="link" className="p-0">
                            <FaShare />
                          </Button>
                        </Card.Title>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <div>
                            <h5 className="text-primary mb-0">${auction.currentBid || "N/A"}</h5>
                            <small className="text-muted">Current Bid</small>
                          </div>
                          <div className="text-end">
                            <div className="d-flex align-items-center">
                              <FaClock className="me-1" />
                              <span>{formatDate(auction.idopont)}</span>
                            </div>
                            <small><FaUsers /> {auction.bidders || 0} bidders</small>
                          </div>
                        </div>
                        <Button 
                          variant="outline-primary" 
                          className="w-100"
                          onClick={() => {
                            console.log("Open auction:", auction.arveresId);
                          }}
                        >
                          Place Bid
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Container>
      </Container>
    </div>
    </>
  );
};

export default Arveresek;