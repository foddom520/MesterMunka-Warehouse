import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";

function Home() {
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    // Példa API hívás
    fetch("http://localhost:5000/api/auctions") // <-- saját API végpont
      .then((res) => res.json())
      .then((data) => setAuctions(data))
      .catch((err) => console.error("Hiba az adatok lekérésekor:", err));
  }, []);

  return (
    <div>
      {/* Árverések száma */}
      {auctions.length > 0 ? (
        <h4>Összesen {auctions.length} árverés található</h4>
      ) : (
        <h4>Nincs jelenleg árverés</h4>
      )}

      {/* Lista megjelenítése */}
      {auctions.map((auction, index) => (
        <Card key={index} className="mb-3">
          {auction.image && (
            <Card.Img variant="top" src={auction.image} alt={auction.title} />
          )}
          <Card.Body>
            <Card.Title>{auction.title}</Card.Title>
            <Card.Text>{auction.description}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default Home;
