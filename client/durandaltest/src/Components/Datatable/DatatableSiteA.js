import "../../SCSS/Components/_datatable.scss"
import * as React from 'react';
import { SiteAssetsTableAxios } from "../../datatablesource";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalSiteA from "../Modal/ModalSiteA";

const Datatable = () => {
    const [modalSiteAShow, setModalSiteAShow] = React.useState(false);

    return (
        <div className="datatable" id="datatable-att">
            <ToastContainer />
            <span className="dabiWebText">DABI WEB / Activos </span>
            <button id="add-attribute-btn" className="add-button" onClick={() => setModalSiteAShow(true)}>Agregar <FontAwesomeIcon icon={faAdd}/></button>
            
            <ModalSiteA
                show={modalSiteAShow}
                onHide={() => setModalSiteAShow(false)}
            />

            <SiteAssetsTableAxios />
        </div>
    )
}

export default Datatable;
