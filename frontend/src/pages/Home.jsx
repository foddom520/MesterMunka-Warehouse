// App.jsx
import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Button, Modal, Carousel, Badge, ProgressBar } from "react-bootstrap";
import { FaClock, FaUsers, FaTrophy, FaGavel, FaSearch, FaBell, FaUser, FaHeart, FaShare, FaTag } from 'react-icons/fa';
import '../styles/HomePage.css';

// Mock data for auctions
const mockAuctions = [
  {
    id: 1,
    title: "Vintage Rolex Submariner",
    currentBid: 2450,
    startingPrice: 2000,
    timeLeft: "2h 45m",
    bidders: 42,
    image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    category: "Watches",
    featured: true
  },
  {
    id: 2,
    title: "Modern Abstract Painting",
    currentBid: 1200,
    startingPrice: 800,
    timeLeft: "1d 3h",
    bidders: 28,
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    category: "Art",
    featured: true
  },
  {
    id: 3,
    title: "Limited Edition Sneakers",
    currentBid: 650,
    startingPrice: 500,
    timeLeft: "6h 30m",
    bidders: 156,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    category: "Fashion"
  },
  {
    id: 4,
    title: "Antique Wooden Desk",
    currentBid: 850,
    startingPrice: 600,
    timeLeft: "3d 2h",
    bidders: 19,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    category: "Furniture"
  },
  {
    id: 5,
    title: "Rare Vinyl Record Collection",
    currentBid: 3200,
    startingPrice: 2500,
    timeLeft: "12h 15m",
    bidders: 67,
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    category: "Music",
    featured: true
  },
  {
    id: 6,
    title: "Sports Memorabilia Set",
    currentBid: 1800,
    startingPrice: 1500,
    timeLeft: "5d",
    bidders: 34,
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    category: "Sports"
  }
];

// Categories
const categories = [
  "All Categories",
  "Art",
  "Electronics",
  "Fashion",
  "Jewelry",
  "Watches",
  "Automotive",
  "Real Estate",
  "Collectibles"
];

function App() {
  const [auctions, setAuctions] = useState(mockAuctions);
  const [showModal, setShowModal] = useState(false);
  const [selectedAuction, setSelectedAuction] = useState(null);
  const [bidAmount, setBidAmount] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [timeFilter, setTimeFilter] = useState("all");
  const [featuredAuctions] = useState(mockAuctions.filter(a => a.featured));
  const [liveAuctions, setLiveAuctions] = useState([]);
  const [stats, setStats] = useState({
    totalAuctions: 1247,
    activeBidders: 3421,
    totalValue: "$4.2M",
    successRate: "94%"
  });

  useEffect(() => {
    // Simulate live auction updates
    const interval = setInterval(() => {
      setLiveAuctions(prev => {
        const updated = [...prev];
        if (updated.length < 3) {
          updated.push({
            id: Date.now(),
            title: "Live Auction Item",
            currentBid: Math.floor(Math.random() * 1000) + 500,
            timeLeft: `${Math.floor(Math.random() * 60)}m`,
            bidders: Math.floor(Math.random() * 50) + 10
          });
        }
        return updated.slice(-3);
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

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

  const openBidModal = (auction) => {
    setSelectedAuction(auction);
    setBidAmount((auction.currentBid + 50).toString());
    setShowModal(true);
  };

  const filteredAuctions = auctions.filter(auction => {
    const matchesSearch = auction.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         auction.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All Categories" || auction.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getTimeColor = (time) => {
    if (time.includes('h') && !time.includes('d')) {
      const hours = parseInt(time);
      return hours < 12 ? 'text-danger' : 'text-warning';
    }
    return 'text-info';
  };

  const LiveAuctionCard = ({ auction }) => (
    <div className="live-auction-card pulse">
      <div className="live-badge">LIVE</div>
      <h6>{auction.title}</h6>
      <div className="d-flex justify-content-between">
        <span className="text-success">${auction.currentBid}</span>
        <small><FaUsers /> {auction.bidders}</small>
      </div>
      <ProgressBar now={70} variant="danger" className="mt-2" />
    </div>
  );

  return (
    <>
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark-custom fixed-top">
        <Container>
          <a className="navbar-brand d-flex align-items-center" href="#">
            <FaGavel className="me-2" />
            <span className="brand-text">Bid<span className="text-primary">&</span>Lock</span>
          </a>
          
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search auctions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="navbar-actions">
            <Button variant="outline-light" className="me-2">
              <FaBell />
            </Button>
            <Button variant="primary" className="me-2">
              Create Auction
            </Button>
            <Button variant="light">
              <FaUser className="me-1" />
              Sign In
            </Button>
          </div>
        </Container>
      </nav>

      {/* Hero Section */}
      <div className="text-center py-5 background-Image-custom hero-section">
        <Container className="text-white py-lg-5">
          <h1 className="display-3 fw-bold mb-4 animate-text">Bid & Lock</h1>
          <p className="lead fs-4 mb-4">Welcome to the premium auction platform where you can bid and lock your deals!</p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Button variant="primary" size="lg" className="px-4 py-2">
              Start Bidding <FaGavel className="ms-2" />
            </Button>
            <Button variant="outline-light" size="lg" className="px-4 py-2">
              How It Works
            </Button>
          </div>
          
          {/* Stats */}
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

      {/* Categories */}
      <Container className="my-5">
        <h2 className="text-center mb-4">Browse Categories</h2>
        <div className="categories-scroll">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "primary" : "outline-secondary"}
              className="me-2 mb-2"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </Container>

      {/* Featured Auctions Carousel */}
      {featuredAuctions.length > 0 && (
        <div className="bg-light py-5">
          <Container>
            <h2 className="text-center mb-4">
              <FaTrophy className="me-2 text-warning" />
              Featured Auctions
            </h2>
            <Carousel className="custom-carousel">
              {featuredAuctions.map(auction => (
                <Carousel.Item key={auction.id}>
                  <div className="featured-auction-card">
                    <Row className="align-items-center">
                      <Col md={6}>
                        <img
                          className="d-block w-100 rounded featured-img"
                          src={auction.image}
                          alt={auction.title}
                        />
                      </Col>
                      <Col md={6}>
                        <div className="p-4">
                          <Badge bg="warning" className="mb-2">{auction.category}</Badge>
                          <h3>{auction.title}</h3>
                          <div className="d-flex align-items-center my-3">
                            <h4 className="text-primary mb-0">${auction.currentBid}</h4>
                            <small className="text-muted ms-2">Current Bid</small>
                          </div>
                          <div className="d-flex align-items-center mb-3">
                            <FaClock className="me-2" />
                            <span className={getTimeColor(auction.timeLeft)}>
                              {auction.timeLeft} remaining
                            </span>
                          </div>
                          <Button 
                            variant="primary" 
                            size="lg"
                            onClick={() => openBidModal(auction)}
                          >
                            Place Bid <FaGavel className="ms-2" />
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          </Container>
        </div>
      )}

      {/* Live Auctions Sidebar */}
      <Container className="my-5">
        <Row>
          <Col lg={9}>
            {/* Auctions Grid */}
            <h3 className="mb-4">Active Auctions</h3>
            <Row>
              {filteredAuctions.map(auction => (
                <Col lg={4} md={6} key={auction.id} className="mb-4">
                  <Card className="auction-card h-100">
                    <div className="card-image-container">
                      <Card.Img variant="top" src={auction.image} />
                      <Button variant="light" className="wishlist-btn">
                        <FaHeart />
                      </Button>
                      <Badge bg="info" className="category-badge">
                        {auction.category}
                      </Badge>
                    </div>
                    <Card.Body>
                      <Card.Title className="d-flex justify-content-between">
                        {auction.title}
                        <Button variant="link" className="p-0">
                          <FaShare />
                        </Button>
                      </Card.Title>
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <div>
                          <h5 className="text-primary mb-0">${auction.currentBid}</h5>
                          <small className="text-muted">Current Bid</small>
                        </div>
                        <div className="text-end">
                          <div className="d-flex align-items-center">
                            <FaClock className="me-1" />
                            <span className={getTimeColor(auction.timeLeft)}>
                              {auction.timeLeft}
                            </span>
                          </div>
                          <small><FaUsers /> {auction.bidders} bidders</small>
                        </div>
                      </div>
                      <Button 
                        variant="outline-primary" 
                        className="w-100"
                        onClick={() => openBidModal(auction)}
                      >
                        Place Bid
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>

          {/* Live Auctions Sidebar */}
          <Col lg={3} className="d-none d-lg-block">
            <div className="sticky-top" style={{ top: '100px' }}>
              <div className="live-auctions-sidebar p-3 rounded shadow">
                <h5 className="d-flex align-items-center mb-3">
                  <span className="live-dot"></span>
                  Live Auctions
                </h5>
                {liveAuctions.map(auction => (
                  <LiveAuctionCard key={auction.id} auction={auction} />
                ))}
                {liveAuctions.length === 0 && (
                  <div className="text-center py-3">
                    <FaClock className="display-6 text-muted mb-2" />
                    <p className="text-muted">Live auctions will appear here</p>
                  </div>
                )}
                
                <div className="mt-4">
                  <h6 className="text-muted mb-2">Quick Actions</h6>
                  <Button variant="outline-dark" className="w-100 mb-2">
                    <FaTag className="me-2" />
                    Watchlist
                  </Button>
                  <Button variant="outline-dark" className="w-100 mb-2">
                    <FaTrophy className="me-2" />
                    My Bids
                  </Button>
                  <Button variant="outline-dark" className="w-100">
                    <FaUsers className="me-2" />
                    Top Bidders
                  </Button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Bid Modal */}
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

      {/* Footer */}
      <footer className="bg-dark-custom text-white py-5 mt-5">
        <Container>
          <Row>
            <Col md={4}>
              <h5 className="d-flex align-items-center mb-3">
                <FaGavel className="me-2" />
                Bid & Lock
              </h5>
              <p className="text-light">
                The premier auction platform for unique items and exclusive deals. 
                Bid with confidence, lock your wins.
              </p>
            </Col>
            <Col md={2}>
              <h6>Platform</h6>
              <ul className="list-unstyled">
                <li><a href="#" className="text-light">How it Works</a></li>
                <li><a href="#" className="text-light">Browse Auctions</a></li>
                <li><a href="#" className="text-light">Sell Items</a></li>
              </ul>
            </Col>
            <Col md={3}>
              <h6>Support</h6>
              <ul className="list-unstyled">
                <li><a href="#" className="text-light">Help Center</a></li>
                <li><a href="#" className="text-light">Terms of Service</a></li>
                <li><a href="#" className="text-light">Privacy Policy</a></li>
              </ul>
            </Col>
            <Col md={3}>
              <h6>Stay Updated</h6>
              <p className="text-light">Subscribe to our newsletter</p>
              <div className="input-group">
                <input 
                  type="email" 
                  className="form-control" 
                  placeholder="Enter email" 
                />
                <Button variant="primary">Subscribe</Button>
              </div>
            </Col>
          </Row>
          <hr className="bg-light my-4" />
          <div className="text-center">
            <p className="mb-0">&copy; 2024 Bid & Lock. All rights reserved.</p>
          </div>
        </Container>
      </footer>
    </>
  );
}

export default App;