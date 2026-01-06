import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home.jsx';
import Raktar from './pages/Raktar.jsx';
import Arveresek from './pages/Arveresek.jsx';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Login from './pages/Login.jsx';
import Registration from './pages/Registration.jsx';
import Profil from './pages/Profil.jsx';
import { FaClock, FaUsers, FaTrophy, FaGavel, FaSearch, FaBell, FaUser, FaHeart, FaShare, FaTag } from 'react-icons/fa';
import { Container, Row, Col, Card, Button, Modal, Carousel, Badge, ProgressBar } from "react-bootstrap";
import './styles/HomePage.css';

function App() {
    const [searchQuery, setSearchQuery] = useState("");
  return (
    <BrowserRouter>
      <Navbar bg="dark" variant="dark">
        {/* 🔹 Top row */}
        <Container className="d-flex align-items-center justify-content-between py-2">
          <a className="navbar-brand d-flex align-items-center" href="#">
            <FaGavel className="me-2" />
            <span className="brand-text">
              Bid<span className="text-primary">&</span>Lock
            </span>
          </a>

          <div className="search-container mx-3 flex-grow-1">
            <FaSearch className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search auctions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="navbar-actions d-flex align-items-center">
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

        {/* 🔹 Bottom row */}
        <div className="border-top border-secondary">
          <Container>
            <Nav className="py-2 justify-content-center">
              <Nav.Link href="/">Főoldal</Nav.Link>
              <Nav.Link href="/Arveresek">Árverések</Nav.Link>
              <Nav.Link href="/Raktar">Raktárak</Nav.Link>
              <Nav.Link href="/Login">Bejelentkezés</Nav.Link>
              <Nav.Link href="/Registration">Regisztráció</Nav.Link>
              <Nav.Link href="/Profil">Profil</Nav.Link>
            </Nav>
          </Container>
        </div>
      </Navbar>


      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Raktar" element={<Raktar />} />
        <Route path='/Arveresek' element={<Arveresek />}/>
        <Route path='/Login' element={<Login />}/>
        <Route path='/Registration' element={<Registration />}/>
        <Route path='/Profil' element={<Profil />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;