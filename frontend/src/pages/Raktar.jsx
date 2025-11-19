import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useEffect, useState } from 'react';

function Raktar() {
  const [adatok, setAdatok] = useState([]);

  useEffect(() => {
    var betoltottAdatok = []

    //logika az adatok leszedéséhez az adatbázisból.

    setAdatok(betoltottAdatok);
  }, []);

  return (
    <>
      <div className="mb-3">
        <h5>Összes raktár: {adatok.length} db</h5>
      </div>

      <Row>
        {adatok.map((item) => (
          <Col key={item.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Card style={{ width: '18rem', height: '100%' }}>
              <Card.Img 
                variant="top" 
                src={item.kepUrl} 
                style={{ height: '160px', objectFit: 'cover' }}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{item.cim}</Card.Title>
                <Card.Text className="flex-grow-1">
                  {item.leiras}
                </Card.Text>
                <Card.Text>
                  <small className="text-muted">ID: {item.id}</small>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {adatok.length === 0 && (
        <div className="text-center">
          <p>Nincsenek raktárak az adatbázisban.</p>
        </div>
      )}
    </>
  );
}

export default Raktar;