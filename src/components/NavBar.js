import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useHistory } from "react-router-dom";

export default function NavigationBar() {
  const history = useHistory();

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        
          <Navbar.Brand
            href="#"
            onClick={() => {
              history.push("/Feed");
            }}
          >
            FitNow
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              href="#"
              onClick={() => {
                history.push("/Feed");
              }}
            >
              Feed
            </Nav.Link>
            <Nav.Link
              href="#"
              onClick={() => {
                history.push("/Home");
              }}
            >
              Profile
            </Nav.Link>
          </Nav>
        
      </Navbar>
    </div>
  );
}
