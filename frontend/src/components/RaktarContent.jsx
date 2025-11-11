import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useEffect, useState } from 'react';

function RaktarCard() {
  const [adatok, setAdatok] = useState([]);

  useEffect(() => {
    // 🔽 Itt történik majd az adatbázisból való lekérés (pl. fetch vagy axios)
    // Ez most egy példa statikus tömbbel
    const betoltottAdatok = [
      {
        id: 1,
        cim: 'Raktár 1', // ➤ Card.Title
        leiras: 'Ez az első raktár leírása.', // ➤ Card.Text
        kepUrl: 'https://via.placeholder.com/100x160?text=Raktar1', // ➤ Card.Img
      },
      {
        id: 2,
        cim: 'Raktár 2',
        leiras: 'Ez a második raktár leírása.',
        kepUrl: 'https://via.placeholder.com/100x160?text=Raktar2',
      },
      {
        id: 3,
        cim: 'Raktár 3',
        leiras: 'Ez a harmadik raktár leírása.',
        kepUrl: 'https://via.placeholder.com/100x160?text=Raktar3',
      },
      {
        id: 4,
        cim: 'Raktár 4',
        leiras: 'Ez a negyedik raktár leírása.',
        kepUrl: 'https://via.placeholder.com/100x160?text=Raktar4',
      },
    ];

    setAdatok(betoltottAdatok);
  }, []);

  return (
    <Row xs={1} md={2} className="g-4">
      {adatok.map((kartya) => (
        <Col key={kartya.id}>
          <Card>
            {/* ➤ Kép URL az adatbázisból */}
            <Card.Img variant="top" src={kartya.kepUrl} />

            <Card.Body>
              {/* ➤ Cím az adatbázisból */}
              <Card.Title>{kartya.cim}</Card.Title>

              {/* ➤ Leírás az adatbázisból */}
              <Card.Text>{kartya.leiras}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default RaktarCard;
