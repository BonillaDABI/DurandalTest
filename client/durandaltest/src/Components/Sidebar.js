import { faHome, faBars, faUsers, faPlus, faPen, faGear, faKey } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import '../SCSS/Components/_sidebar.scss'
import logo from "../Media/Logos/logo-dabi-line.png"


const SideBar = ({children}) => {
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
            <main>{children}</main>
        </div>
    )
}

export default SideBar;