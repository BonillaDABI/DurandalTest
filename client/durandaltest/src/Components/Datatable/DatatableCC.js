import "../../SCSS/Components/_datatable.scss"
import * as React from 'react';
import { ContactsTableAxios } from "../../datatablesource";
import ModalCC from "../Modal/ModalCC";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Datatable = () => {
    const [modalCCShow, setModalCCShow] = React.useState(false);

    return (
        <div className="datatable">
            <ToastContainer />
            <span className="dabiWebText">DABI WEB / Contactos </span>
            <button className="add-button" onClick={() => setModalCCShow(true)}>Agregar <FontAwesomeIcon icon={faAdd}/></button>

            <ModalCC
                show={modalCCShow}
                onHide={() => setModalCCShow(false)}
            />

            <ContactsTableAxios />
        </div>
    )
}

export default Datatable
