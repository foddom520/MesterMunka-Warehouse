import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Spinner, Alert, Container, Button } from 'react-bootstrap';
import { FaGavel, FaHistory, FaCheckCircle } from 'react-icons/fa';

const PlaceBid = () => {
  const { id } = useParams();
  const [auction, setAuction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [bidAmount, setBidAmount] = useState("");

  const fetchAuction = async () => {
    try {
      const res = await fetch(`http://localhost:3000/arveresinfo/${id}`);
      const data = await res.json();
      if (data && data.length > 0) {
        setAuction(data[0]);
      } else {
        setError("Az árverés nem található.");
      }
    } catch (err) {
      setError("Hiba az adatok lekérésekor.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuction();
  }, [id]);

  const handlePlaceBid = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await fetch("http://localhost:3000/arveresinfo/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          aid: id, 
          licit: Number(bidAmount) 
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Sikertelen licitálás.");
      }

      setSuccess(`Sikeres licit: ${bidAmount} Ft`);
      setBidAmount("");
      fetchAuction(); // Update current price display

    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <Container className="py-5 text-center"><Spinner animation="border" /></Container>;
  if (error) return <Container className="py-5"><Alert variant="danger">{error}</Alert></Container>;

  return (
    <Container className="py-5">
      <div className="auction-header mb-4">
        <span className="badge bg-primary text-uppercase">Élő Árverés #{id}</span>
        <h1 className="display-4 fw-bold">{auction?.title || "Raktár Licit"}</h1>
      </div>

      <div className="bid-card p-4 border rounded shadow-sm bg-white">
        {success && (
          <Alert variant="success" className="d-flex align-items-center">
            <FaCheckCircle className="me-2" /> {success}
          </Alert>
        )}

        <div className="mb-4">
          <p className="text-muted mb-0">Jelenlegi legmagasabb licit</p>
          <h2 className="text-primary fw-bold">
            {(auction?.licit || auction?.Licit || 0).toLocaleString()} Ft
          </h2>
        </div>

        <form onSubmit={handlePlaceBid} className="d-flex gap-2">
          <input 
            type="number" 
            className="form-control form-control-lg"
            placeholder="Licit összege (Ft)"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            required
          />
          <Button type="submit" variant="primary" size="lg">
            <FaGavel className="me-2" /> Licitálás
          </Button>
        </form>
        
        <div className="mt-4 pt-3 border-top">
          <div className="d-flex align-items-center text-muted">
            <FaHistory className="me-2" />
            <span>Kategória: {auction?.category || "Nincs megadva"}</span>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default PlaceBid;