import "../../SCSS/Components/_datatable.scss"
import * as React from 'react';
import { ItemsTableAxios } from "../../datatablesource";
import ModalI from "../Modal/ModalI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Datatable = () => {
    const [modalIShow, setModalIShow] = React.useState(false);

    return (
        <div className="datatable">
            <ToastContainer />
            <span className="dabiWebText">DABI WEB / Items </span>
            <button className="add-button" onClick={() => setModalIShow(true)}>Agregar <FontAwesomeIcon icon={faAdd}/></button>

            <ModalI
                show={modalIShow}
                onHide={() => setModalIShow(false)}
            />

            <ItemsTableAxios />
        </div>
    )
}

export default Datatable
