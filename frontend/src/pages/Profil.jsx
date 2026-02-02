import { useEffect, useMemo, useState } from "react";
import {Container,Row,Col,Nav,Card,Form,Button,Alert,InputGroup} from "react-bootstrap";

export default function ProfileSettings() {
  const sections = useMemo(
    () => [
      { id: "profile", label: "Profile details" },
      { id: "security", label: "Security" },
      { id: "danger", label: "Danger zone" },
    ],
    []
  );

  const [activeId, setActiveId] = useState("profile");

  const [profile, setProfile] = useState({
    displayName: "Alex Example",
    username: "alexexample",
    email: "alex@example.com",
    bio: "Short bio…",
  });

  const [profileSaved, setProfileSaved] = useState(false);

  const [security, setSecurity] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactorEnabled: false,
  });

  const [showPw, setShowPw] = useState(false);
  const [securityMsg, setSecurityMsg] = useState({ type: "", text: "" });

  const [prefs, setPrefs] = useState({
    theme: "system",
    language: "en",
    timezone: "Europe/Budapest",
    marketingEmails: false,
  });

  const [prefsSaved, setPrefsSaved] = useState(false);

  const [notifs, setNotifs] = useState({
    productUpdates: true,
    securityAlerts: true,
    weeklyDigest: false,
    pushNotifications: false,
  });

  const [notifsSaved, setNotifsSaved] = useState(false);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) setActiveId(visible.target.id);
      },
      {
        threshold: [0.25, 0.5, 0.75],
        rootMargin: "-15% 0px -70% 0px",
      }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  const saveProfile = (e) => {
    e.preventDefault();
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2000);
    // TODO: call API here
  };

  const savePrefs = (e) => {
    e.preventDefault();
    setPrefsSaved(true);
    setTimeout(() => setPrefsSaved(false), 2000);
    // TODO: call API here
  };

  const saveNotifs = (e) => {
    e.preventDefault();
    setNotifsSaved(true);
    setTimeout(() => setNotifsSaved(false), 2000);
    // TODO: call API here
  };

  const updatePassword = (e) => {
    e.preventDefault();
    setSecurityMsg({ type: "", text: "" });

    const { currentPassword, newPassword, confirmPassword } = security;

    if (!currentPassword || !newPassword || !confirmPassword) {
      setSecurityMsg({ type: "danger", text: "Please fill in all password fields." });
      return;
    }
    if (newPassword.length < 8) {
      setSecurityMsg({ type: "danger", text: "New password must be at least 8 characters." });
      return;
    }
    if (newPassword !== confirmPassword) {
      setSecurityMsg({ type: "danger", text: "New password and confirmation do not match." });
      return;
    }
    if (newPassword === currentPassword) {
      setSecurityMsg({ type: "warning", text: "New password should be different from current." });
      return;
    }

    setSecurityMsg({ type: "success", text: "Password updated (demo). Hook this up to your API." });
    setSecurity((s) => ({
      ...s,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    }));

    // TODO: call API here
  };

  const passwordStrength = (() => {
    const pw = security.newPassword;
    if (!pw) return { label: "—", variant: "secondary" };
    const score =
      (pw.length >= 8) +
      /[A-Z]/.test(pw) +
      /[a-z]/.test(pw) +
      /\d/.test(pw) +
      /[^A-Za-z0-9]/.test(pw);

    if (score <= 2) return { label: "Weak", variant: "danger" };
    if (score === 3) return { label: "Okay", variant: "warning" };
    if (score === 4) return { label: "Good", variant: "info" };
    return { label: "Strong", variant: "success" };
  })();

  return (
    <Container fluid className="py-4">
      <Row className="g-4">
        <Col lg={3}>
          <div style={{ position: "sticky", top: "1rem" }}>
            <Card>
              <Card.Body>
                <Card.Title className="mb-3">Settings</Card.Title>
                <Nav variant="pills" className="flex-column">
                  {sections.map((s) => (
                    <Nav.Link
                      key={s.id}
                      active={activeId === s.id}
                      onClick={() => scrollTo(s.id)}
                      style={{ cursor: "pointer" }}
                    >
                      {s.label}
                    </Nav.Link>
                  ))}
                </Nav>
                <div className="text-muted mt-3" style={{ fontSize: 12 }}>
                  Tip: scroll the page — the active section will highlight.
                </div>
              </Card.Body>
            </Card>
          </div>
        </Col>

        <Col lg={9}>
          <section id="profile" style={{ scrollMarginTop: "1rem" }}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>Profile details</Card.Title>
                <Card.Subtitle className="text-muted mb-3">
                  Basic info shown on your account.
                </Card.Subtitle>

                {profileSaved && <Alert variant="success">Profile saved (demo).</Alert>}

                <Form onSubmit={saveProfile}>
                  <Row className="g-3">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                          value={profile.username}
                          onChange={(e) =>
                            setProfile((p) => ({ ...p, username: e.target.value }))
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          value={profile.email}
                          onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <div className="mt-3 d-flex gap-2">
                    <Button type="submit">Save changes</Button>
                    <Button
                      variant="outline-secondary"
                      type="button"
                      onClick={() =>
                        setProfile({
                          displayName: "Alex Example",
                          username: "alexexample",
                          email: "alex@example.com",
                          bio: "Short bio…",
                        })
                      }
                    >
                      Reset
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </section>


          {/* meg kell csinálni hogy egy felugró ablakban jelenjen meg a jelszó válzotatás mikor rá nyomunk a "jelszó megváltoztatása" gombra */}
          <section id="security" style={{ scrollMarginTop: "1rem" }}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>Security</Card.Title>
                <Card.Subtitle className="text-muted mb-3">
                  Change your password and secure your account.
                </Card.Subtitle>

                {securityMsg.text && <Alert variant={securityMsg.type}>{securityMsg.text}</Alert>}

                <Row className="g-4">
                  <Col md={12}>
                    <Card className="border-0">
                      <Card.Body className="p-0">
                        <h6 className="mb-3">Change password</h6>

                        <Form onSubmit={updatePassword}>
                          <Form.Group className="mb-3">
                            <Form.Label>Current password</Form.Label>
                            <Form.Control
                              type={showPw ? "text" : "password"}
                              value={security.currentPassword}
                              onChange={(e) =>
                                setSecurity((s) => ({
                                  ...s,
                                  currentPassword: e.target.value,
                                }))
                              }
                              autoComplete="current-password"
                            />
                          </Form.Group>

                          <Form.Group className="mb-2">
                            <Form.Label>New password</Form.Label>
                            <InputGroup>
                              <Form.Control
                                type={showPw ? "text" : "password"}
                                value={security.newPassword}
                                onChange={(e) =>
                                  setSecurity((s) => ({ ...s, newPassword: e.target.value }))
                                }
                                autoComplete="new-password"
                              />
                              <Button
                                type="button"
                                variant="outline-secondary"
                                onClick={() => setShowPw((v) => !v)}
                              >
                                {showPw ? "Hide" : "Show"}
                              </Button>
                            </InputGroup>
                            <Form.Text>
                              Strength:{" "}
                              <span className={`text-${passwordStrength.variant}`}>
                                {passwordStrength.label}
                              </span>
                            </Form.Text>
                          </Form.Group>

                          <Form.Group className="mb-3">
                            <Form.Label>Confirm new password</Form.Label>
                            <Form.Control
                              type={showPw ? "text" : "password"}
                              value={security.confirmPassword}
                              onChange={(e) =>
                                setSecurity((s) => ({
                                  ...s,
                                  confirmPassword: e.target.value,
                                }))
                              }
                              autoComplete="new-password"
                              isInvalid={
                                !!security.confirmPassword &&
                                security.newPassword !== security.confirmPassword
                              }
                            />
                            <Form.Control.Feedback type="invalid">
                              Passwords do not match.
                            </Form.Control.Feedback>
                          </Form.Group>

                          <Button type="submit">Update password</Button>
                        </Form>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </section>

          <section id="danger" style={{ scrollMarginTop: "1rem" }}>
            <Card className="mb-4 border-danger">
              <Card.Body>
                <Card.Title className="text-danger">Danger zone</Card.Title>
                <Card.Subtitle className="text-muted mb-3">
                  Destructive actions. Handle with care.
                </Card.Subtitle>

                <Row className="g-3">
                  

                  <Col md={12}>
                    <Card className="border-danger">
                      <Card.Body>
                        <h6 className="text-danger">Delete account</h6>
                        <div className="text-muted mb-3" style={{ fontSize: 13 }}>
                          Permanently delete your account and associated data.
                        </div>
                        <Button variant="danger" type="button" className="w-100">
                          Delete account (demo)
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>

                <Alert variant="warning" className="mt-3 mb-0">
                  These buttons are non-functional in this demo. Wire them to a confirmation modal + API.
                </Alert>
              </Card.Body>
            </Card>
          </section>
        </Col>
      </Row>
    </Container>
  );
}
