import React, { useContext, useEffect, useRef, useState } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faLanguage, faMoon, faSearch, faSun, faUser } from '@fortawesome/free-solid-svg-icons'

import { DarkModeContext } from "../../Context/darkModeContext";
import { Box, Button, ClickAwayListener, Grow, Icon, IconButton, InputBase, MenuItem, MenuList, Paper, Popper, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const {dispatch, darkMode} = useContext(DarkModeContext)

    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);

    const handleToggle = () => {
        setOpen(prevOpen => !prevOpen);
    };

    const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
    }
        setOpen(false);
    };
      
    function handleListKeyDown(event) {
        if (event.key === "Tab") {
          event.preventDefault();
          setOpen(false);
        } else if (event.key === "Escape") {
          setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = useRef(open);
    useEffect(() => {
    if (prevOpen.current === true && open === false) {
        anchorRef.current.focus();
    }
    prevOpen.current = open;
    }, [open]);
      
    const navigate = useNavigate();

    const logoutUser = () => {
        localStorage.removeItem("token");
        localStorage.setItem("isAuthenticated", "false");
        navigate("/");
    }
   
    return (
        <Box className="navbar" display="flex" justifyContent="space-between" p={2} backgroundColor="#F5F6F8">
            {/* SEARCH BAR */}
            <Box
                className="navbar-search-bar"
                display="flex"
                backgroundColor="#dc1f0f"
                borderRadius="3px"
            >
                <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Buscar..."></InputBase>
                <IconButton type="button" sx={{ p: 1 }}>
                    <FontAwesomeIcon icon={faSearch} />
                </IconButton>
            </Box>
            {/* ICONS */}
            <Box display="flex">
                <IconButton onClick={() => dispatch({type:"TOGGLE"})}>
                    {darkMode === false ? (
                        <FontAwesomeIcon icon={faMoon} className="navbar-icons" />
                    ) : (
                        <FontAwesomeIcon icon={faSun} className="navbar-icons" />
                    )}
                </IconButton>
                <IconButton>
                    <FontAwesomeIcon icon={faLanguage} className="navbar-icons" />
                </IconButton>
                <IconButton>
                    <FontAwesomeIcon icon={faBell} className="navbar-icons" />
                </IconButton>
                <Stack>
                    <IconButton
                        ref={anchorRef}
                        aria-controls={open ? 'composition-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={handleToggle}
                    >
                        <Typography className="navbar-icons">{localStorage.getItem("username")}</Typography>
                    </IconButton>
                    <Popper
                        open={open}
                        anchorEl={anchorRef.current}
                        role={undefined}
                        placement="bottom-start"
                        transition
                        disablePortal
                    >
                        {({ TransitionProps, placement }) => (
                            <Grow
                            {...TransitionProps}
                                style={{
                                    transformOrigin:
                                    placement === 'bottom-start' ? 'left top' : 'left bottom',
                                }}
                            >
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                <MenuList
                                    autoFocusItem={open}
                                    id="composition-menu"
                                    aria-labelledby="composition-button"
                                    onKeyDown={handleListKeyDown}
                                >
                                    <MenuItem onClick={handleClose}>Perfil</MenuItem>
                                    <MenuItem onClick={() => logoutUser()}>Logout</MenuItem>
                                </MenuList>
                                </ClickAwayListener>
                            </Paper>
                            </Grow>
                        )}
                    </Popper>
                </Stack>
            </Box>
        </Box>
    )
}

export default Navbar