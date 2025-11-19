import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../styles/Navbar.css';

function MyNavbar() {
  return (
    <div className='balmargin'>
      <Navbar expand="lg" className="bg-body-tertiary">
          <label className="navbar-brand">WareHouse</label>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Árverések</Nav.Link>
              <Nav.Link as={Link} to="/link">Raktár</Nav.Link>
            </Nav>
          </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default MyNavbar;