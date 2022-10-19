import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from "react-router-dom";


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus, faUserPen, faUsers, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'

  const NavBar = () => {
    const navigate = useNavigate();
    const logoutUser = () => {
        localStorage.removeItem("token");
        localStorage.setItem("isAuthenticated", "false");
        navigate("/");
    }

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/dashboard">Dashboard</Navbar.Brand>
                    <Nav>
                        <Nav.Link href="/create"><FontAwesomeIcon icon={faUserPlus} /> Create | Users</Nav.Link>
                        <Nav.Link href="/update"><FontAwesomeIcon icon={faUserPen} /> Update | Users</Nav.Link>
                        <Nav.Link href="/listAll"><FontAwesomeIcon icon={faUsers} /> List All | Users</Nav.Link>
                        <Nav.Link onClick={() => logoutUser()}><FontAwesomeIcon icon={faRightFromBracket} /> Logout</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
  };

  export default NavBar;