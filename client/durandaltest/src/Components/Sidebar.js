import { faHome, faBars, faUsers, faPlus, faPen, faGear, faKey, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../SCSS/Components/_sidebar.scss'
import logo from "../Media/Logos/logo-dabi-line.png"
import { useNavigate } from "react-router-dom";


const SideBar = ({children}) => {
    const navigate = useNavigate();
    const logoutUser = () => {
        localStorage.removeItem("token");
        localStorage.setItem("isAuthenticated", "false");
        navigate("/");
    }

    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => setIsOpen(!isOpen)

    const menuItem = [
        {
            path: "/",
            name: "Inicio",
            icon: <FontAwesomeIcon icon={faHome} />
        },
        {
            path: "/ListAll",
            name: "Usuarios",
            icon: <FontAwesomeIcon icon={faUsers} />
        },
        {
            path: "/ListAllR",
            name: "Roles",
            icon: <FontAwesomeIcon icon={faGear} />
        },
        {
            path: "/ListAllP",
            name: "Permisos",
            icon: <FontAwesomeIcon icon={faKey} />
        }
    ]

    return (
        <div className='container'>
            <div style={{width: isOpen ? "200px" : "50px"}} className='sidebar'>
                <div className='top-section'>
                    <h1 style={{display: isOpen ? "block" : "none"}} className='logo'><img id="logo" src={logo}></img></h1>
                    <div style={{marginLeft: isOpen ? "30px" : "0px"}} className='bars'>
                        <FontAwesomeIcon icon={faBars} onClick={toggle}/>
                    </div>
                </div>
                {
                    menuItem.map((item, index) => (
                        <NavLink to={item.path} key={index} className='link' activeclassName='active'>
                            <div className='icon'>{item.icon}</div>
                            <div style={{display: isOpen ? "block" : "none"}} className='link_text'>{item.name}</div>
                        </NavLink>
                    ))
                }
            </div>            
            <div style={{marginLeft: isOpen ? "-280px" : "-400px"}} className='main-content'>
                <nav style={{
                    marginLeft: isOpen ? "-10px" : "-37px", 
                    height: isOpen ? "82px" : "60px",
                    width: isOpen? "1683px" : "1830px"
                    }} 
                    className='mainHeader'>
                        <NavDropdown
                                id="user-tab"
                                menuVariant="dark"
                                title = {<><FontAwesomeIcon icon={faUser} /> Usuario</>}
                            >
                                <NavDropdown.Item onClick={logoutUser}> Logout <FontAwesomeIcon icon={faRightFromBracket} /></NavDropdown.Item>  
                        </NavDropdown>
                    </nav>
                <main>
                    {children}
                </main>
                <footer  style={{
                    marginLeft: isOpen ? "-10px" : "-37px", 
                    height: isOpen ? "82px" : "60px",
                    width: isOpen? "1683px" : "1830px"
                    }}
                    className='mainFooter'>
                        <span>2022 © DABI.</span>
                </footer>
            </div>
        </div>
    )
}

export default SideBar;