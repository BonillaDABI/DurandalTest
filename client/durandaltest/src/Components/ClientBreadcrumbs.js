import React from 'react';
import { Breadcrumbs, Link } from "@mui/material"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faUser } from '@fortawesome/free-solid-svg-icons'

export default function ClientBreadcrumbs() {
    return (
        <Breadcrumbs aria-label="breadcrumb">
            <Link
                underline="hover"
                sx={{ display: 'flex', alignItems: 'center', ":hover": { color: "gray" }, marginLeft: "10px"}}
                color="inherit"
                href="/clients"
            >
                <FontAwesomeIcon icon={faBook}/>
                Clientes
            </Link>
            <Link
                underline="none"
                sx={{ display: 'flex', alignItems: 'center', ":hover": { color: "black" }}}
                href="/clients/clientInfo"
                color="text.primary"
            >
                <FontAwesomeIcon icon={faUser} />
                Info del Cliente
            </Link>
        </Breadcrumbs>
    )
}

