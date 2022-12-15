import "../../SCSS/Components/_datatable.scss"
import * as React from 'react';
import { ActivitiesTableAxios } from "../../datatablesource";
import ModalAct from "../Modal/ModalAct";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Datatable = () => {
    const [modalActShow, setModalActShow] = React.useState(false);

    return (
        <div className="datatable">
            <ToastContainer />
            <span className="dabiWebText">DABI WEB / Actividades </span>
            <button className="add-button" onClick={() => setModalActShow(true)}>Agregar <FontAwesomeIcon icon={faAdd}/></button>

            <ModalAct
                show={modalActShow}
                onHide={() => setModalActShow(false)}
            />

            <ActivitiesTableAxios />
        </div>
    )
}

export default Datatable
