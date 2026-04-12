import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Spinner, Alert, Container, Button } from 'react-bootstrap';
import { FaGavel, FaHistory } from 'react-icons/fa';

const PlaceBid = () => {
  const { id } = useParams();
  const [auction, setAuction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [bidAmount, setBidAmount] = useState("");

  useEffect(() => {
    const fetchAuction = async () => {
      try {
        const res = await fetch(`http://localhost:3000/arveresinfo/${id}`);
        const data = await res.json();
        if (data && data.length > 0) setAuction(data[0]);
        else setError("Az árverés nem található.");
      } catch (err) {
        setError("Hiba az adatok lekérésekor.");
      } finally {
        setLoading(false);
      }
    };
    fetchAuction();
  }, [id]);

  const handlePlaceBid = async (e) => {
    e.preventDefault();
    // Licitálási logika ide...
    alert(`Licit elküldve: ${bidAmount} Ft`);
  };

  if (loading) return <Container className="py-5 text-center"><Spinner animation="border" /></Container>;
  if (error) return <Container className="py-5"><Alert variant="danger">{error}</Alert></Container>;

  return (
    <Container className="py-5">
      <div className="auction-header mb-4">
        <span className="badge bg-primary uppercase">Élő Árverés #{id}</span>
        <h1 className="display-4 fw-bold">{auction?.title || "Raktár Licit"}</h1>
        <p className="text-muted">Kérjük, adja meg az összeget a licitáláshoz.</p>
      </div>

      <div className="bid-card p-4 border rounded shadow-sm bg-white">
        <div className="d-flex justify-content-between mb-4">
          <div>
            <p className="text-muted mb-0">Jelenlegi legmagasabb licit</p>
            <h2 className="text-primary font-bold">{auction?.Licit?.toLocaleString()} Ft</h2>
          </div>
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
      </div>
    </Container>
  );
};

export default PlaceBid;