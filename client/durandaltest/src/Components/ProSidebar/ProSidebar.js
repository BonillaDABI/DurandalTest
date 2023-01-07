import { useContext } from "react";
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import { Link, useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../Context/darkModeContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faAddressBook, faBell, faBook, faBorderAll, faBox, faBoxesPacking, faBoxesStacked, faCalendarDays, faGear, faHelmetSafety, faKey, faListCheck, faLocationArrow, faLocationDot, faRightFromBracket, faScrewdriverWrench, faSquarePollVertical, faUser, faUserGear, faUsers, faHome } from '@fortawesome/free-solid-svg-icons';
import { Box } from "@mui/material";

const NewSidebar = () => {
    const { collapseSidebar, toggleSidebar, collapsed, toggled, broken, rtl } = useProSidebar();

    const toggle = () => {
        toggleSidebar();
        if (toggled) {
            collapseSidebar();
        } else {
            collapseSidebar();
        }
    };

    const {dispatch} = useContext(DarkModeContext)
    const navigate = useNavigate();
    const logoutUser = () => {
        localStorage.removeItem("token");
        localStorage.setItem("isAuthenticated", "false");
        navigate("/");
    }
    return (
        <Box
            sx={{
                "& .icon": {
                    color: 'red ',
                },
                "& .ps-menu-button:hover": {
                    background: '#f3f8fb',
                },
                "& .ps-menu-button::active": {
                    background: 'black !important',
                },
                "& .ps-sidebar-container":{
                    background: '#F5F6F8',
                },              
            }}
        >
            <Sidebar style={{ height: "100vh" }} rtl={false}>
                <Menu>
                    <MenuItem
                        icon={<FontAwesomeIcon icon={faBars} className="icon"/>}
                        onClick={() => {
                            toggle();
                        }}
                        style={{  textAlign: "center" }}
                    >
                    
                    </MenuItem>
                </Menu>
                <Menu>
                    <MenuItem 
                        routerLink={<Link to="/dashboard" style={{textDecoration: 'none'}}></Link>}
                        icon={<FontAwesomeIcon icon={faHome} className="icon"/>}
                    >
                        Inicio
                    </MenuItem>
                </Menu>
                <Menu>
                    {toggled ? (
                        <MenuItem disabled>---------</MenuItem>
                    ): (
                        <MenuItem disabled>Generales</MenuItem>
                    )}
                    <MenuItem 
                        routerLink={<Link to="/clients" style={{textDecoration: 'none'}}></Link>}
                        icon={<FontAwesomeIcon icon={faBook} className="icon"/>}
                    >
                        Clientes
                    </MenuItem>
                    <MenuItem 
                        routerLink={<Link to="/tecnicos" style={{textDecoration: 'none'}}></Link>}
                        icon={<FontAwesomeIcon icon={faHelmetSafety} className="icon"/>}
                    >
                        Técnicos
                    </MenuItem>
                    <MenuItem 
                        routerLink={<Link to="/ListAll" style={{textDecoration: 'none'}}></Link>}
                        icon={<FontAwesomeIcon icon={faUsers} className="icon"/>}
                    >
                        Usuarios
                    </MenuItem>
                </Menu>
                <Menu>
                    {toggled ? (
                        <MenuItem disabled>---------</MenuItem>
                    ): (
                        <MenuItem disabled>Modulos</MenuItem>
                    )}
                    <MenuItem 
                        routerLink={<Link to="/visits" style={{textDecoration: 'none'}}></Link>}
                        icon={<FontAwesomeIcon icon={faLocationArrow} className="icon"/>}
                    >
                        Visitas
                    </MenuItem>
                    <MenuItem 
                        routerLink={<Link to="/activities" style={{textDecoration: 'none'}}></Link>}
                        icon={<FontAwesomeIcon icon={faListCheck} className="icon"/>}
                    >
                        Actividades
                    </MenuItem>
                    <MenuItem 
                        routerLink={<Link to="/equipments" style={{textDecoration: 'none'}}></Link>}
                        icon={<FontAwesomeIcon icon={faScrewdriverWrench} className="icon"/>}
                    >
                        Equipos
                    </MenuItem>
                    <MenuItem 
                        routerLink={<Link to="/items" style={{textDecoration: 'none'}}></Link>}
                        icon={<FontAwesomeIcon icon={faBox} className="icon"/>}
                    >
                        Items
                    </MenuItem>
                    <MenuItem 
                        routerLink={<Link to="/assets" style={{textDecoration: 'none'}}></Link>}
                        icon={<FontAwesomeIcon icon={faBoxesPacking} className="icon"/>}
                    >
                        Activos
                    </MenuItem>
                </Menu>
                {/* <Menu>
                    {toggled ? (
                        <MenuItem disabled>------</MenuItem>
                    ): (
                        <MenuItem disabled>Perfil</MenuItem>
                    )}
                    <MenuItem
                        onClick={() => logoutUser()}
                        icon={<FontAwesomeIcon icon={faRightFromBracket} className="icon"/>}
                    >
                        Logout
                    </MenuItem>
                </Menu> */}
            </Sidebar>
        </Box>
    );
};


export default NewSidebar;
