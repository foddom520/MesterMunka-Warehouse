import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button, Row, Col, Card } from "react-bootstrap";
import backgroundimage from '../kepek/HomePageBackGround.png';

const Arveresek = () => {
  return (
    <div>
      <div className="text-center py-5 background-Image-custom">
        <Container>
            <h1>Árverések</h1>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={backgroundimage} />
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card>

        </Container>
      </div>
    </div>
  );
}
export default Arveresek;