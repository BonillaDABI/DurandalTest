import "../../SCSS/Components/_datatable.scss"
import * as React from 'react';
import { VisitsTableAxios } from "../../datatablesource";
import ModalV from "../Modal/ModalV";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Datatable = () => {
    const [modalVShow, setModalVShow] = React.useState(false);

    return (
        <div className="datatable">
            <ToastContainer />
            <span className="dabiWebText">DABI WEB / Visitas </span>
            <button className="add-button" onClick={() => setModalVShow(true)}>Agregar <FontAwesomeIcon icon={faAdd}/></button>

            <ModalV
                show={modalVShow}
                onHide={() => setModalVShow(false)}
            />

            <VisitsTableAxios />
        </div>
    )
}

export default Datatable
