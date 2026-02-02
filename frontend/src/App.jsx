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
import { FaGavel} from 'react-icons/fa';
import { Container, Row, Col,  Button} from "react-bootstrap";
import './styles/HomePage.css';
import Balsavgeci from './pages/testlelek.jsx';

function App() {
  return (
    <div>
    <BrowserRouter>
      <Navbar bg="dark" variant="dark">
        <Container className="d-flex align-items-center justify-content-between py-2">
          <a className="navbar-brand d-flex align-items-center" href="#">
            <FaGavel className="me-2" />
            <span className="brand-text">
              Bid<span className="text-primary">&</span>Lock
            </span>
          </a>

          <div className="navbar-actions d-flex align-items-center">
          </div>
        </Container>
        <div>
          <Container>
            <Nav className="py-2 justify-content-center">
              <Nav.Link href="/">Főoldal</Nav.Link>
              <Nav.Link href="/Arveresek">Árverések</Nav.Link>
              <Nav.Link href="/Raktar">Raktárak</Nav.Link>
              <Nav.Link href="/Login">Bejelentkezés</Nav.Link>
              <Nav.Link href="/Registration">Regisztráció</Nav.Link>
              <Nav.Link href="/Profil">Profil</Nav.Link>
              <Nav.Link href="/testelek">Test Elek</Nav.Link>
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
        <Route path="/testelek" element={<Balsavgeci />} />
      </Routes>
    </BrowserRouter>

    <footer className="bg-dark-custom text-white py-4 mt-4">
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
</div>
  );
}

export default App;