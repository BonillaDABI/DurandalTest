import "../../SCSS/Components/_datatable.scss"
import * as React from 'react';
import { RolesTableAxios } from "../../datatablesource";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";

const Datatable = () => {
    return (
        <div className="datatable">
            <span className="dabiWebText">DABI WEB</span>
            <button className="add-button">Agregar <FontAwesomeIcon icon={faAdd}/></button>
            <RolesTableAxios />
        </div>
    )
}

export default Datatable
