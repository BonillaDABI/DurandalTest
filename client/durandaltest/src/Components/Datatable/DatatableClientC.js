import "../../SCSS/Components/_datatable.scss"
import * as React from 'react';
import { ClientContactsTableAxios } from "../../datatablesource";
import ModalCC from "../Modal/ModalCC";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Datatable = () => {
    const [modalClientCShow, setModalClientCShow] = React.useState(false);

    return (
        <div className="datatable">
            <ToastContainer />
            <span className="dabiWebText">DABI WEB / Contactos </span>
            <button className="add-button" onClick={() => setModalClientCShow(true)}>Agregar <FontAwesomeIcon icon={faUserPlus}/></button>

            <ModalCC
                show={modalClientCShow}
                onHide={() => setModalClientCShow(false)}
            />

            <ClientContactsTableAxios />
        </div>
    )
}

export default Datatable
