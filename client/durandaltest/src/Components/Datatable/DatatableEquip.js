import "../../SCSS/Components/_datatable.scss"
import * as React from 'react';
import { EquipsTableAxios } from "../../datatablesource";
import ModalE from "../Modal/ModalE";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Datatable = () => {
    const [modalEShow, setModalEShow] = React.useState(false);

    return (
        <div className="datatable">
            <ToastContainer />
            <span className="dabiWebText">DABI WEB / Equipos </span>
            <button className="add-button" onClick={() => setModalEShow(true)}>Agregar <FontAwesomeIcon icon={faAdd}/></button>

            <ModalE
                show={modalEShow}
                onHide={() => setModalEShow(false)}
            />

            <EquipsTableAxios />
        </div>
    )
}

export default Datatable
