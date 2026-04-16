import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Button, Card, Row, Col, Alert, Spinner, Badge, Form, Collapse } from "react-bootstrap";
import { FaClock, FaCalendarCheck, FaExclamationTriangle, FaTrash, FaPlus, FaGavel } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

const Arveresek = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false); // For Admin Form Collapse

  // Admin Form State
  const [newAuction, setNewAuction] = useState({
    title: "", category: "", idopont: "", Licit: "", Kep_URL: ""
  });

  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const isAdmin = storedUser && storedUser.Admin === 1;

  const load = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/arveres");
      const data = await res.json();
      
      const fullData = await Promise.all(
        data.map(async (item) => {
          try {
            const detailRes = await fetch(`http://localhost:3000/arveresinfo/${item.id}`);
            const detailData = await detailRes.json();
            return { ...item, ...detailData[0] };
          } catch { return item; }
        })
      );
      setItems(fullData);
    } catch (e) {
      setError("Nem sikerült betölteni az adatokat.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleAddAuction = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/arveres/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAuction)
      });

      if (res.ok) {
        setNewAuction({ title: "", category: "", idopont: "", Licit: "", Kep_URL: "" });
        setOpen(false);
        load();
      } else {
        alert("Hiba történt a mentés során.");
      }
    } catch (err) {
      alert("Hálózati hiba.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Biztosan törölni szeretnéd ezt az aukciót?")) return;
    try {
      const res = await fetch(`http://localhost:3000/arveres/${id}`, { method: 'DELETE' });
      if (res.ok) load();
    } catch (err) { alert("Sikertelen törlés."); }
  };

  const isExpired = (dateValue) => {
    if (!dateValue) return false; 
    return new Date(dateValue) < new Date();
  };

  const renderAuctionCard = (auction, expired) => {
    const currentPrice = auction.Licit ?? auction.licit;
    const imageUrl = auction.Kep_URL ?? auction.kep_url;
    const auctionDate = auction.idopont ?? auction.Idopont;

    return (
      <Col key={auction.id} xs={12} md={6} lg={4} className="mb-4">
        <Card className={`h-100 shadow border-0 ${expired ? 'opacity-75' : ''}`}>
          <div className="position-relative">
            {imageUrl ? (
              <Card.Img variant="top" src={imageUrl} style={{ height: "200px", objectFit: "cover" }} />
            ) : (
              <div className="bg-dark text-white d-flex align-items-center justify-content-center" style={{ height: "200px" }}>
                <FaExclamationTriangle className="me-2" /> Nincs kép
              </div>
            )}
            <Badge bg={expired ? "secondary" : "success"} className="position-absolute top-0 end-0 m-2">
              {expired ? "Lejárt" : "Aktív"}
            </Badge>
            
            {isAdmin && (
              <Button variant="danger" size="sm" className="position-absolute top-0 start-0 m-2" onClick={() => handleDelete(auction.id)}>
                <FaTrash />
              </Button>
            )}
          </div>
          
          <Card.Body className="d-flex flex-column">
            <Card.Title className="fw-bold">{auction.title || "Raktár tétel"}</Card.Title>
            <Card.Subtitle className="mb-3 text-muted small">{auction.category || "Ismeretlen"}</Card.Subtitle>
            
            <div className="mt-auto">
              <div className="p-2 rounded bg-light border text-center mb-3">
                <span className="h4 fw-bold text-primary">
                  {currentPrice ? `${Number(currentPrice).toLocaleString()} Ft` : "---"}
                </span>
              </div>
              <div className="d-flex align-items-center mb-3 small text-muted">
                {expired ? <FaCalendarCheck className="me-2 text-danger" /> : <FaClock className="me-2 text-primary" />}
                <span>{new Date(auctionDate).toLocaleString("hu-HU")}</span>
              </div>
              {!expired ? (
                <Button variant="primary" className="w-100 fw-bold" onClick={() => navigate(`/arveresinfo/${auction.id}`)}>
                  Licitálás
                </Button>
              ) : (
                <Button variant="outline-secondary" className="w-100" disabled>Lezárult</Button>
              )}
            </div>
          </Card.Body>
        </Card>
      </Col>
    );
  };

  const activeAuctions = items.filter(i => !isExpired(i.idopont ?? i.Idopont));
  const expiredAuctions = items.filter(i => isExpired(i.idopont ?? i.Idopont));

  return (
    <div className="min-vh-100 py-5 background-Image-custom">
      <Container>
        <div className="d-flex justify-content-between align-items-center mb-5">
          <h1 className="text-white fw-bold">Árverési Csarnok</h1>
          {isAdmin && (
            <Button onClick={() => setOpen(!open)} variant="success" aria-controls="admin-form" aria-expanded={open}>
              <FaPlus className="me-2" /> Új raktár aukció
            </Button>
          )}
        </div>

        {/* ADMIN ADD FORM */}
        <Collapse in={open}>
          <div id="admin-form">
            <Card className="mb-5 p-4 border-0 shadow-lg">
              <h4 className="mb-4 text-primary"><FaGavel className="me-2"/> Új Aukció Létrehozása</h4>
              <Form onSubmit={handleAddAuction}>
                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Label>Raktár megnevezése</Form.Label>
                    <Form.Control required value={newAuction.title} onChange={e => setNewAuction({...newAuction, title: e.target.value})} placeholder="pl: 112-es egység - Elmaradt bérlet" />
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Label>Kategória</Form.Label>
                    <Form.Control required value={newAuction.category} onChange={e => setNewAuction({...newAuction, category: e.target.value})} placeholder="Bútor, Vegyes..." />
                  </Col>
                  <Col md={4} className="mb-3">
                    <Form.Label>Kezdő Ár (Ft)</Form.Label>
                    <Form.Control required type="number" value={newAuction.Licit} onChange={e => setNewAuction({...newAuction, Licit: e.target.value})} />
                  </Col>
                  <Col md={4} className="mb-3">
                    <Form.Label>Lejárat ideje</Form.Label>
                    <Form.Control required type="datetime-local" value={newAuction.idopont} onChange={e => setNewAuction({...newAuction, idopont: e.target.value})} />
                  </Col>
                  <Col md={4} className="mb-3">
                    <Form.Label>Kép URL</Form.Label>
                    <Form.Control value={newAuction.Kep_URL} onChange={e => setNewAuction({...newAuction, Kep_URL: e.target.value})} placeholder="https://..." />
                  </Col>
                </Row>
                <Button type="submit" variant="primary" className="w-100 mt-2 py-2 fw-bold">Aukció indítása</Button>
              </Form>
            </Card>
          </div>
        </Collapse>

        {loading ? (
          <div className="text-center py-5"><Spinner animation="border" variant="light" /></div>
        ) : (
          <>
            <h3 className="text-white mb-4 border-bottom pb-2">Aktív árverések</h3>
            <Row className="mb-5">{activeAuctions.map(a => renderAuctionCard(a, false))}</Row>
            
            <h3 className="text-white-50 mb-4 border-bottom border-secondary pb-2">Lejárt árverések</h3>
            <Row>{expiredAuctions.map(a => renderAuctionCard(a, true))}</Row>
          </>
        )}
      </Container>
    </div>
  );
};

export default Arveresek;