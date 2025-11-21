import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button, Row, Col, Card } from "react-bootstrap";
import '../styles/HomePage.css';
import backgroundimage from '../kepek/HomePageBackGround.png';

function App() {
  return (
    <>
      <div className="text-center py-5 background-Image-custom">
        <Container className="text-white">
          <h1>Bid & Lock</h1>
          <p className="lead">Welcome to the auction platform where you can bid and lock your deals!</p>
        </Container>
      </div>
    </>
  );
}
export default App;