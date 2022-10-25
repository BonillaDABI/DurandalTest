import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
//import Dropdown from 'react-bootstrap/Dropdown';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus, faUserPen, faUsers, faRightFromBracket, faPlus, faPen, faList, faUserGear, faUsersGear, faGear, faKey } from '@fortawesome/free-solid-svg-icons'
//import DropdownMenu from 'react-bootstrap/esm/DropdownMenu';
//import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import { useNavigate } from "react-router-dom";

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
                    <Navbar.Toggle aria-controls="navbar-dark-example" />
                    <Navbar.Collapse id="navbar-dark-example">
                        <Nav>
                            <NavDropdown
                                id="nav-dropdown-dark-example"
                                menuVariant="dark"
                                title = {<><FontAwesomeIcon icon={faPlus} /> Create</>}
                            >
                                <NavDropdown.Item href="/create">Users <FontAwesomeIcon icon={faUserPlus} /></NavDropdown.Item>
                                <NavDropdown.Item href="/createR">Roles <FontAwesomeIcon icon={faUserGear} /></NavDropdown.Item>
                            </NavDropdown>

                            <NavDropdown
                                id="nav-dropdown-dark-example"
                                menuVariant="dark"
                                title = {<><FontAwesomeIcon icon={faPen} /> Update</>}
                            >
                                <NavDropdown.Item href="/update">Users <FontAwesomeIcon icon={faUserPen} /></NavDropdown.Item>
                                <NavDropdown.Item href="/updateR">Roles <FontAwesomeIcon icon={faGear} /></NavDropdown.Item>
                            </NavDropdown>

                            <NavDropdown
                                id="nav-dropdown-dark-example"
                                menuVariant="dark"
                                title = {<><FontAwesomeIcon icon={faList} /> List All</>}
                            >
                                <NavDropdown.Item href="/ListAll">Users <FontAwesomeIcon icon={faUsers} /></NavDropdown.Item>
                                <NavDropdown.Item href="/ListAllR">Roles <FontAwesomeIcon icon={faUsersGear} /></NavDropdown.Item>
                                <NavDropdown.Item href="/ListAllP">Permissions <FontAwesomeIcon icon={faKey} /></NavDropdown.Item>
                            </NavDropdown>

                            <Nav.Link id="logout-button" onClick={() => logoutUser()}><FontAwesomeIcon icon={faRightFromBracket} /> Logout</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
  };

  export default NavBar;