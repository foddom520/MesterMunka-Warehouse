// App.js
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button, Row, Col, Card } from "react-bootstrap";
import '../styles/HomePage.css';

function App() {
  return (
    <>
      <div className="text-center py-5 background-Image-custom">
        <Container>
          <h1>Welcome to MyWebsite</h1>
          <p className="lead">Building modern and responsive web apps with React and Bootstrap.</p>
          <Button variant="primary" size="lg">Get Started</Button>
        </Container>
      </div>

      <Container className="my-5" id="features">
        <h2 className="text-center mb-4">Features</h2>
        <Row>
          <Col md={4} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title>Responsive Design</Card.Title>
                <Card.Text>
                  Works seamlessly across all devices and screen sizes.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title>Easy to Customize</Card.Title>
                <Card.Text>
                  Fully built with React components for flexibility and speed.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title>Modern UI</Card.Title>
                <Card.Text>
                  Clean, modern interface powered by Bootstrap 5.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default App;