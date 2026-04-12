import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Raktar from './pages/Raktar.jsx';
import Arveresek from './pages/Arveresek.jsx';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Login from './pages/Login.jsx';
import Registration from './pages/Registration.jsx';
import Profil from './pages/Profil.jsx';
import { FaGavel, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { Container, Row, Col, Button } from "react-bootstrap";
import './styles/HomePage.css';
import PlaceBid from './pages/PlaceBid.jsx';

function App() {
  // Check if user is logged in
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/"; // Redirect and refresh to update UI
  };

  return (
    <div className="d-flex flex-column min-vh-100"> 
      <BrowserRouter>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
              <FaGavel className="me-2" />
              <span className="brand-text">
                Bid<span className="text-primary">&</span>Lock
              </span>
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="main-navbar" />
            <Navbar.Collapse id="main-navbar">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/">Kezdőlap</Nav.Link>
                <Nav.Link as={Link} to="/raktar">Raktár</Nav.Link>
                <Nav.Link as={Link} to="/arveresek">Árverések</Nav.Link>
              </Nav>
              
              <Nav>
                {user ? (
                  <>
                    {/* Only visible if logged in */}
                    <Nav.Link as={Link} to="/profil">
                      <FaUser className="me-1" /> Profil
                    </Nav.Link>
                    <Nav.Link onClick={handleLogout} style={{ cursor: 'pointer' }}>
                      <FaSignOutAlt className="me-1" /> Kijelentkezés
                    </Nav.Link>
                  </>
                ) : (
                  <>
                    <Nav.Link as={Link} to="/login">Bejelentkezés</Nav.Link>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/raktar" element={<Raktar />} />
          <Route path="/arveresek" element={<Arveresek />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/arveresinfo/:id" element={<PlaceBid />} />
          {user && <Route path="/profil" element={<Profil />} />}
        </Routes>

        <footer className="bg-dark-custom text-white py-4 mt-auto">
          <Container>
            <Row>
              <Col md={4}>
                <h5 className="d-flex align-items-center mb-3">
                  <FaGavel className="me-2" /> Bid & Lock
                </h5>
                <p className="text-light">
                  A prémium árverési platform egyedi tételekhez. Licitáljon magabiztosan.
                </p>
              </Col>
              <Col md={4}>
                <h6>Support</h6>
                <ul className="list-unstyled">
                  <li><a href="#" className="text-light">Segítségnyújtás</a></li>
                  <li><a href="#" className="text-light">Feltételek</a></li>
                </ul>
              </Col>
              <Col md={4}>
                <p className="text-light">Iratkozzon fel hírlevelünkre</p>
                <div className="input-group">
                  <input type="email" className="form-control" placeholder="Email" />
                  <Button variant="primary">Feliratkozás</Button>
                </div>
              </Col>
            </Row>
            <hr className="bg-light my-4" />
            <div className="text-center pb-2">
              <p>&copy; 2026 Bid & Lock. Minden jog fenntartva.</p>
            </div>
          </Container>
        </footer>
      </BrowserRouter>
    </div>
  );
}

export default App;