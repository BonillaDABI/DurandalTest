import "../../SCSS/Components/_datatable.scss"
import * as React from 'react';
import { SitesTableAxios } from "../../datatablesource";
import ModalS from "../Modal/ModalS";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Datatable = () => {
    const [modalSitesShow, setModalSitesShow] = React.useState(false);

    return (
        <div className="datatable">
            <ToastContainer />
            <span className="dabiWebText">DABI WEB / Sitios </span>
            <button className="add-button" onClick={() => setModalSitesShow(true)}>Agregar <FontAwesomeIcon icon={faPlus}/></button>

            <ModalS
                show={modalSitesShow}
                onHide={() => setModalSitesShow(false)}
            />

            <SitesTableAxios />
        </div>
    )
}

export default Datatable
