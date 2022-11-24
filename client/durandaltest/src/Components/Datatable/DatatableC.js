import "../../SCSS/Components/_datatable.scss"
import * as React from 'react';
import { ClientsTableAxios } from "../../datatablesource";
import ModalC from "../Modal/ModalC";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Datatable = () => {
    const [modalCShow, setModalCShow] = React.useState(false);

    return (
        <div className="datatable">
            <ToastContainer />
            <span className="dabiWebText">DABI WEB / Clientes </span>
            <button className="add-button" onClick={() => setModalCShow(true)}>Agregar <FontAwesomeIcon icon={faAdd}/></button>

            <ModalC
                show={modalCShow}
                onHide={() => setModalCShow(false)}
            />

            <ClientsTableAxios />
        </div>
    )
}

export default Datatable
