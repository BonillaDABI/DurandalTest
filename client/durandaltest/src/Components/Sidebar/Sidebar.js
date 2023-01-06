import React, { useContext } from "react";

import "../../SCSS/Components/_sidebar.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressBook, faBell, faBook, faBorderAll, faBox, faBoxesPacking, faBoxesStacked, faCalendarDays, faGear, faHelmetSafety, faKey, faListCheck, faLocationArrow, faLocationDot, faRightFromBracket, faScrewdriverWrench, faSquarePollVertical, faUser, faUserGear, faUsers } from '@fortawesome/free-solid-svg-icons'
import { DarkModeContext } from "../../Context/darkModeContext";
import { Link, useNavigate } from "react-router-dom";

import logo from "../../Media/Logos/logo-dabi-line.png"


const Sidebar = () => {
    const {dispatch} = useContext(DarkModeContext)
    const navigate = useNavigate();
    const logoutUser = () => {
        localStorage.removeItem("token");
        localStorage.setItem("isAuthenticated", "false");
        navigate("/");
    }

    return (
        <div className="sidebar">
            <div className="top">
                <span className="logo">
                    <img src={logo} id="logo" alt="dabi logo"></img>
                </span>
            </div>
            <hr />
            <div className="center">
                <ul>
                    <p className="title">BIENVENIDO</p>
                    <Link to="/dashboard" style={{textDecoration: 'none'}}>
                        <li>
                            <FontAwesomeIcon icon={faBorderAll} className="icon"/>
                            <span>Inicio</span>
                        </li>
                    </Link>
                    <p className="title">GENERALES</p>
                    <Link to="/clients" style={{textDecoration: 'none'}} >
                        <li>
                            <FontAwesomeIcon icon={faBook} className="icon"/>
                            <span>Clientes</span>
                        </li>
                    </Link>
                    <Link to="/tecnicos" style={{textDecoration: 'none'}} >
                        <li>
                            <FontAwesomeIcon icon={faHelmetSafety} className="icon"/>
                            <span>Técnicos</span>
                        </li>
                    </Link>
                    <Link to="/ListAll" style={{textDecoration: 'none'}} >
                        <li>
                            <FontAwesomeIcon icon={faUsers} className="icon"/>
                            <span>Usuarios</span>
                        </li>
                    </Link>
                    <p className="title">MÓDULOS</p>
                    <Link to="/visits" style={{textDecoration: 'none'}} >
                        <li>
                            <FontAwesomeIcon icon={faLocationArrow} className="icon"/>
                            <span>Visitas</span>
                        </li>
                    </Link>
                    <Link to="/activities" style={{textDecoration: 'none'}} >
                        <li>
                            <FontAwesomeIcon icon={faListCheck} className="icon"/>
                            <span>Actividades</span>
                        </li>
                    </Link>
                    <Link to="/equipments" style={{textDecoration: 'none'}} >
                        <li>
                            <FontAwesomeIcon icon={faScrewdriverWrench} className="icon"/>
                            <span>Equipos</span>
                        </li>
                    </Link>
                    <Link to="/items" style={{textDecoration: 'none'}} >
                        <li>
                            <FontAwesomeIcon icon={faBox} className="icon"/>
                            <span>Items</span>
                        </li>
                    </Link>
                    <Link to="/assets" style={{textDecoration: 'none'}} >
                        <li>
                            <FontAwesomeIcon icon={faBoxesPacking} className="icon"/>
                            <span>Activos</span>
                        </li>
                    </Link>                 
                    {/* <p className="title">FUNCIONES</p>
                    <Link to="#" style={{textDecoration: 'none'}} >
                        <li>
                            <FontAwesomeIcon icon={faCalendarDays} className="icon"/>
                            <span>Agenda</span>
                        </li>
                    </Link>
                    <Link to="#" style={{textDecoration: 'none'}} >
                        <li>
                            <FontAwesomeIcon icon={faSquarePollVertical} className="icon"/>
                            <span>Indicadores</span>
                        </li>
                    </Link>
                    <Link to="#" style={{textDecoration: 'none'}} >
                        <li>
                            <FontAwesomeIcon icon={faLocationDot} className="icon"/>
                            <span>Tracking</span>
                        </li>
                    </Link> */}
                    
                    <p className="title">EXTRAS / USUARIO</p>
                    {/* <li>
                        <FontAwesomeIcon icon={faBell} className="icon"/>
                        <span>Notificaciones</span>
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faGear} className="icon"/>
                        <span>Ajustes</span>
                    </li> */}
                    <li onClick={() => logoutUser()}>
                        <FontAwesomeIcon icon={faRightFromBracket} className="icon"/>
                        <span>Logout</span>
                    </li>                    
                </ul>
            </div>
            {/* <div className="bottom">
                <div 
                    className="colorOption" 
                    onClick={() => dispatch({type:"LIGHT"})}
                ></div>
                <div 
                    className="colorOption" 
                    onClick={() => dispatch({type:"DARK"})}
                ></div>
            </div> */}
        </div>
    )
}

export default Sidebar

/*

<p className="title">LISTAS</p>
                    <Link to="/ListAllR" style={{textDecoration: 'none'}} >
                        <li>
                            <FontAwesomeIcon icon={faUserGear} className="icon"/>
                            <span>Roles</span>
                        </li>
                    </Link>
                    <Link to="/ListAllP" style={{textDecoration: 'none'}} >
                        <li>
                            <FontAwesomeIcon icon={faKey} className="icon"/>
                            <span>Permisos</span>                        
                        </li>
                    </Link>

*/