import "../../SCSS/Components/_datatable.scss"
import * as React from 'react';
import { EquipAttTableAxios } from "../../datatablesource";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalEqAtt from "../Modal/ModalEqAtt";

const Datatable = () => {
    const [modalEqAttShow, setModalEqAttShow] = React.useState(false);

    return (
        <div className="datatable" id="datatable-att">
            <ToastContainer />
            <span className="dabiWebText">DABI WEB / Atributos </span>
            <button id="add-attribute-btn" className="add-button" onClick={() => setModalEqAttShow(true)}>Agregar <FontAwesomeIcon icon={faAdd}/></button>
            
            <ModalEqAtt
                show={modalEqAttShow}
                onHide={() => setModalEqAttShow(false)}
            />

            <EquipAttTableAxios />
        </div>
    )
}

export default Datatable
