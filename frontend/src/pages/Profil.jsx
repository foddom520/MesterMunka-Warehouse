import { useEffect, useMemo, useState } from "react";
import { Container, Row, Col, Nav, Card, Form, Button, Alert, InputGroup } from "react-bootstrap";

export default function ProfileSettings() {
  const sections = useMemo(() => [
    { id: "profile", label: "Profile details" },
    { id: "security", label: "Security" },
    { id: "danger", label: "Danger zone" },
  ], []);

  const [activeId, setActiveId] = useState("profile");

  // Keep track of the 'Original' username for the backend POST /p/mod requirement
  const [originalUsername, setOriginalUsername] = useState("tesztfelhasznalo"); 
  const [profile, setProfile] = useState({
    username: "tesztfelhasznalo",
    email: "teszt@example.com",
  });

  const [profileMsg, setProfileMsg] = useState({ type: "", text: "" });

  const [security, setSecurity] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [showPw, setShowPw] = useState(false);
  const [securityMsg, setSecurityMsg] = useState({ type: "", text: "" });

  const saveProfile = async (e) => {
    e.preventDefault();
    setProfileMsg({ type: "", text: "" });

    try {
      const res = await fetch("http://localhost:3000/p/mod", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          Felhasznalonev: profile.username, 
          RegiFnev: originalUsername 
        }),
      });

      if (!res.ok) throw new Error(await res.text());
      
      setProfileMsg({ type: "success", text: "Profil sikeresen frissítve!" });
      setOriginalUsername(profile.username);
    } catch (err) {
      setProfileMsg({ type: "danger", text: err.message || "Hiba a profil mentésekor." });
    }
  };

  const updatePassword = async (e) => {
    e.preventDefault();
    setSecurityMsg({ type: "", text: "" });

    const { newPassword, confirmPassword } = security;

    if (!newPassword || !confirmPassword) {
      setSecurityMsg({ type: "danger", text: "Tölts ki minden mezőt!" });
      return;
    }
    if (newPassword !== confirmPassword) {
      setSecurityMsg({ type: "danger", text: "A jelszavak nem egyeznek." });
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/p/jelszo", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          UjJelszo: newPassword, 
          Felhasznalonev: profile.username 
        }),
      });

      if (!res.ok) throw new Error(await res.text());

      setSecurityMsg({ type: "success", text: "Jelszó sikeresen módosítva!" });
      setSecurity({ newPassword: "", confirmPassword: "" });
    } catch (err) {
      setSecurityMsg({ type: "danger", text: err.message || "Hiba a jelszó módosításakor." });
    }
  };

  const deleteAccount = async () => {
    if (!window.confirm("Biztosan törölni szeretnéd a fiókodat? Ezt nem lehet visszavonni.")) return;

    try {
      const res = await fetch("http://localhost:3000/p/torles", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Felhasznalonev: profile.username }),
      });

      if (!res.ok) throw new Error(await res.text());
      
      alert("Fiók sikeresen törölve!");
      // window.location.href = "/"; // redirect to home
    } catch (err) {
      alert(err.message || "Hiba a fiók törlésekor.");
    }
  };

  return (
    <Container fluid className="py-4">
      <Row className="g-4">
        <Col lg={3}>
          <div style={{ position: "sticky", top: "1rem" }}>
            <Card>
              <Card.Body>
                <Card.Title className="mb-3">Beállítások</Card.Title>
                <Nav variant="pills" className="flex-column">
                  {sections.map((s) => (
                    <Nav.Link key={s.id} active={activeId === s.id} style={{ cursor: "pointer" }}>
                      {s.label}
                    </Nav.Link>
                  ))}
                </Nav>
              </Card.Body>
            </Card>
          </div>
        </Col>

        <Col lg={9}>
          <section id="profile">
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>Profil adatok</Card.Title>
                {profileMsg.text && <Alert variant={profileMsg.type}>{profileMsg.text}</Alert>}

                <Form onSubmit={saveProfile}>
                  <Row className="g-3">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Felhasználónév</Form.Label>
                        <Form.Control
                          value={profile.username}
                          onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button type="submit" className="mt-3">Mentés</Button>
                </Form>
              </Card.Body>
            </Card>
          </section>

          <section id="security">
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>Biztonság</Card.Title>
                {securityMsg.text && <Alert variant={securityMsg.type}>{securityMsg.text}</Alert>}

                <Form onSubmit={updatePassword}>
                  <Form.Group className="mb-2">
                    <Form.Label>Új jelszó</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type={showPw ? "text" : "password"}
                        value={security.newPassword}
                        onChange={(e) => setSecurity({ ...security, newPassword: e.target.value })}
                      />
                      <Button variant="outline-secondary" onClick={() => setShowPw(!showPw)}>
                        {showPw ? "Elrejtés" : "Mutat"}
                      </Button>
                    </InputGroup>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Új jelszó megerősítése</Form.Label>
                    <Form.Control
                      type={showPw ? "text" : "password"}
                      value={security.confirmPassword}
                      onChange={(e) => setSecurity({ ...security, confirmPassword: e.target.value })}
                    />
                  </Form.Group>
                  <Button type="submit">Jelszó frissítése</Button>
                </Form>
              </Card.Body>
            </Card>
          </section>

          <section id="danger">
            <Card className="mb-4 border-danger">
              <Card.Body>
                <Card.Title className="text-danger">Veszélyzóna</Card.Title>
                <Button variant="danger" onClick={deleteAccount}>Fiók törlése</Button>
              </Card.Body>
            </Card>
          </section>
        </Col>
      </Row>
    </Container>
  );
}