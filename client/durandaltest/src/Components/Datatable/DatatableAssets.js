import "../../SCSS/Components/_datatable.scss"
import * as React from 'react';
import { AssetsTableAxios } from "../../datatablesource";
import ModalA from "../Modal/ModalA";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Datatable = () => {
    const [modalAShow, setModalAShow] = React.useState(false);

    return (
        <div className="datatable">
            <ToastContainer />
            <span className="dabiWebText">DABI WEB / Assets </span>
            <button className="add-button" onClick={() => setModalAShow(true)}>Agregar <FontAwesomeIcon icon={faAdd}/></button>

            <ModalA
                show={modalAShow}
                onHide={() => setModalAShow(false)}
            />

            <AssetsTableAxios />
        </div>
    )
}

export default Datatable
