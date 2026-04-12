import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import '../styles/HomePage.css';

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <div className="text-center py-5 background-Image-custom hero-section">
        <Container className="text-white">
          <h1 className="display-3 fw-bold mb-4 animate-text">Bid & Lock</h1>
          <p className="lead fs-4 mb-4">Üdvözöljük a Bid & Lock oldalán!</p>
          <p className="mb-5">Fedezze fel legújabb árveréseinket és licitáljon egyedi raktárkészletekre.</p>
          <Button variant="primary" size="lg" onClick={() => navigate("/arveresek")}>
            Böngészés az árverések között
          </Button>
        </Container>
      </div>
    </>
  );
}

export default Home;