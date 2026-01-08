import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { FaGavel } from 'react-icons/fa';
import '../styles/HomePage.css';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [selectedAuction, setSelectedAuction] = useState(null);
  const [bidAmount, setBidAmount] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [timeFilter, setTimeFilter] = useState("all");
  const [stats, setStats] = useState({
    activeBidders: 3421,
    totalValue: "$4.2M",
    successRate: "94%"
  });

  const handleBidSubmit = (e) => {
    e.preventDefault();
    if (bidAmount && selectedAuction) {
      const minBid = selectedAuction.currentBid + 50;
      if (parseFloat(bidAmount) >= minBid) {
        alert(`Bid of $${bidAmount} submitted successfully!`);
        setShowModal(false);
        setBidAmount("");
      } else {
        alert(`Minimum bid is $${minBid}`);
      }
    }
  };

  return (
    <>
      <div className="text-center py-5 background-Image-custom hero-section">
        <Container className="text-white">
          <h1 className="display-3 fw-bold mb-4 animate-text">Bid & Lock</h1>
          <p className="lead fs-4 mb-4">Welcome to the premium auction platform where you can bid and lock your deals!</p>
          
          <Row className="mt-5 pt-4 stats-row">
            {Object.entries(stats).map(([key, value]) => (
              <Col md={3} sm={6} key={key} className="mb-3">
                <div className="stat-card">
                  <h3 className="text-primary">{value}</h3>
                  <small className="text-light">{key.replace(/([A-Z])/g, ' $1').toUpperCase()}</small>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Place Your Bid</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAuction && (
            <>
              <div className="d-flex align-items-center mb-4">
                <img 
                  src={selectedAuction.image} 
                  alt={selectedAuction.title} 
                  className="rounded me-3"
                  style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                />
                <div>
                  <h5>{selectedAuction.title}</h5>
                  <p className="text-muted mb-0">{selectedAuction.category}</p>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="d-flex justify-content-between mb-2">
                  <span>Current Bid:</span>
                  <strong className="text-primary">${selectedAuction.currentBid}</strong>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span>Minimum Bid:</span>
                  <strong>${selectedAuction.currentBid + 50}</strong>
                </div>
              </div>

              <form onSubmit={handleBidSubmit}>
                <div className="mb-3">
                  <label htmlFor="bidAmount" className="form-label">Your Bid Amount ($)</label>
                  <input
                    type="number"
                    className="form-control"
                    id="bidAmount"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    min={selectedAuction.currentBid + 50}
                    step="10"
                    required
                  />
                  <div className="form-text">
                    Minimum bid: ${selectedAuction.currentBid + 50}
                  </div>
                </div>
                <Button variant="primary" type="submit" className="w-100">
                  Submit Bid
                </Button>
              </form>
            </>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default App;