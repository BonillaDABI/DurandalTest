import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

  const NavBar = () => {
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/dashboard">Dashboard</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/create">Create | Users</Nav.Link>
                        <Nav.Link href="/update">Update | Users</Nav.Link>
                        <Nav.Link href="/listAll">List All | Users</Nav.Link>
                        <Nav.Link href="/">Logout</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
  };

  export default NavBar;