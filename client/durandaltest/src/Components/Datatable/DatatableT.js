import "../../SCSS/Components/_datatable.scss"
import * as React from 'react';
import { AgentsTableAxios } from "../../datatablesource";
import ModalT from "../Modal/ModalT";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Datatable = () => {
    const [modalShow, setModalShow] = React.useState(false);

    return (
        <div className="datatable">
            <ToastContainer />
            <span className="dabiWebText">DABI WEB / Técnicos </span>
            <button className="add-button" onClick={() => setModalShow(true)}>Agregar <FontAwesomeIcon icon={faAdd}/></button>

            <ModalT
                show={modalShow}
                onHide={() => setModalShow(false)}
            />

            <AgentsTableAxios />
        </div>
    )
}

export default Datatable
