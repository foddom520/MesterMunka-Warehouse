import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home.jsx';
import Raktar from './pages/Raktar.jsx';
import Arveresek from './pages/Arveresek.jsx';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Login from './pages/Login.jsx';

function App() {
  return (
    <BrowserRouter>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Bit & Lock</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Főoldal</Nav.Link>
            <Nav.Link href="/Arveresek">Árverések</Nav.Link>
            <Nav.Link href="/Raktar">Raktárak</Nav.Link>
            <Nav.Link href="/Login">Bejelentkezés</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Raktar" element={<Raktar />} />
        <Route path='/Arveresek' element={<Arveresek />}/>
        <Route path='/Login' element={<Login />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;