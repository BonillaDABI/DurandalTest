import React, { useContext } from "react";

import "../../SCSS/Components/_sidebar.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faBorderAll, faGear, faKey, faRightFromBracket, faUser, faUserGear, faUsers } from '@fortawesome/free-solid-svg-icons'
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
                    <img src={logo} id="logo"></img>
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
                    <p className="title">LISTS</p>
                    <Link to="/ListAll" style={{textDecoration: 'none'}} >
                        <li>
                            <FontAwesomeIcon icon={faUsers} className="icon"/>
                            <span>Usuarios</span>
                        </li>
                    </Link>
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
                    <p className="title">EXTRA</p>
                    <li>
                        <FontAwesomeIcon icon={faBell} className="icon"/>
                        <span>Notificaciones</span>
                    </li>
                    <li>
                        <FontAwesomeIcon icon={faGear} className="icon"/>
                        <span>Ajustes</span>
                    </li>
                    <p className="title">USER</p>
                    <li>
                        <FontAwesomeIcon icon={faUser} className="icon"/>
                        <span>Perfil</span>
                    </li>
                    <li onClick={() => logoutUser()}>
                        <FontAwesomeIcon icon={faRightFromBracket} className="icon"/>
                        <span>Logout</span>
                    </li>
                </ul>
            </div>
            <div className="bottom">
                <div 
                    className="colorOption" 
                    onClick={() => dispatch({type:"LIGHT"})}
                ></div>
                <div 
                    className="colorOption" 
                    onClick={() => dispatch({type:"DARK"})}
                ></div>
            </div>
        </div>
    )
}

export default Sidebar