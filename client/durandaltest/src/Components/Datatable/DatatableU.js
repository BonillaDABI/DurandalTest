import "../../SCSS/Components/_datatable.scss"
import * as React from 'react';

import { UserTableAxios } from "../../datatablesource";
import ModalU from "../Modal/ModalU";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";


const Datatable = () => {
    const [modalUShow, setModalUShow] = React.useState(false);

    return (
        <div className="datatable">
            <span className="dabiWebText">DABI WEB / Usuarios </span>
            <button className="add-button" onClick={() => setModalUShow(true)}>Agregar <FontAwesomeIcon icon={faAdd}/></button>

            <ModalU
                show={modalUShow}
                onHide={() => setModalUShow(false)}
            />

            <UserTableAxios />
        </div>
    )
}

export default Datatable
