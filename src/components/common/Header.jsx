import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>Project Dashboard</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="dashboard-navbar" />
        <Navbar.Collapse id="dashboard-navbar">
          <Nav className="ms-auto">
            <LinkContainer to="/employees">
              <Nav.Link>Employees</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/projects">
              <Nav.Link>Projects</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/tasks">
              <Nav.Link>Tasks</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
