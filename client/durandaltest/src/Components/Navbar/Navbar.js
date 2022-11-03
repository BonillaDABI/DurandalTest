import React, { useContext } from "react";

import "../../SCSS/Components/_navbar.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faLanguage, faMoon, faSearch } from '@fortawesome/free-solid-svg-icons'

import { DarkModeContext } from "../../Context/darkModeContext";

const Navbar = () => {
    const {dispatch} = useContext(DarkModeContext)

    return (
        <div className="navbar">
            <div className="wrapper">
                <div className="search">
                    <input type="text" placeholder="Buscar..."/>
                    <FontAwesomeIcon icon={faSearch} />
                </div>
                <div className="items">
                    <div className="item">
                        <FontAwesomeIcon icon={faLanguage} className="icon"/>
                        Español
                    </div>
                    <div className="item">
                        <FontAwesomeIcon icon={faMoon} 
                            className="icon" 
                            onClick={() => dispatch({type:"TOGGLE"})}
                        />
                    </div>
                    <div className="item">
                        <FontAwesomeIcon icon={faBell} className="icon"/>
                        <div className="counter">1</div>
                    </div>
                    <div className="item">
                        <img
                            src="https://images.pexels.com/photos/3344325/pexels-photo-3344325.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            alt=""
                            className="avatar"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar