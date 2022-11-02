import React from 'react'
import { useNavigate } from "react-router-dom";

import '../SCSS/Components/_sidebar.scss'

const HeaderBar = () => {
    const navigate = useNavigate();
    const logoutUser = () => {
        localStorage.removeItem("token");
        localStorage.setItem("isAuthenticated", "false");
        navigate("/");
    }

    return (
        <div className="top-nav">
            <a onClick={() => logoutUser()}></a>
        </div>
    )
}

export default HeaderBar