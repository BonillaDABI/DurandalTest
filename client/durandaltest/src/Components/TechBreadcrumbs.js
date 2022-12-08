import React from 'react';
import { Breadcrumbs, Link } from "@mui/material"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHelmetSafety, faFileLines } from '@fortawesome/free-solid-svg-icons'

export default function TechBreadcrumbs() {
    return (
        <Breadcrumbs aria-label="breadcrumb">
            <Link
                underline="hover"
                sx={{ display: 'flex', alignItems: 'center', ":hover": { color: "gray" }, marginLeft: "10px" }}
                color="inherit"
                href="/tecnicos"
            >
                <FontAwesomeIcon icon={faHelmetSafety} />
                Técnicos
            </Link>
            <Link
                underline="none"
                sx={{ display: 'flex', alignItems: 'center', ":hover": { color: "black" } }}
                href="/tecnicos/tecnicosLogs"
                color="text.primary"
            >
                <FontAwesomeIcon icon={faFileLines} />
                Logs del Técnico
            </Link>
        </Breadcrumbs>
    )
}