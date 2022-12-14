import axios from 'axios';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning, faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";
import "../../../SCSS/Components/_modal.scss"

function ModalSDelete(props) {
    var deleteSiteName = localStorage.getItem("siteNameToDelete");
    var deleteSiteAddressStreet = localStorage.getItem("siteAddressStreetToDelete");
    var deleteSiteAddressNum = localStorage.getItem("siteAddressNumToDelete");
    var deleteSiteAddressPC = localStorage.getItem("siteAddressPCToDelete");
    var deleteSiteBusiness = localStorage.getItem("siteBusinessToDelete");
    var deleteSiteCreatedDate = localStorage.getItem("siteCreatedDateToDelete");

    const deleteSite = () => {
        var deleteSiteId = localStorage.getItem("siteIdToDelete");
        const response = axios.delete(`http://localhost:3001/deleteSite/${deleteSiteId}`);
        console.log(deleteSiteId);
    } 
    
    function hideS(){
        props.onHide();
        window.location.reload();
    }

    function hideN(){
        props.onHide();
    }
  
    return (
        <Modal 
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            backdropClassName="modal-backdrop"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title className="modal-title" id="contained-modal-title-vcenter">
                    ¿Quieres borrar este sitio?
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <span className='delete-info'><strong>Nombre:</strong> {deleteSiteName}</span><br />
                <span className='delete-info'><strong>Cliente:</strong> {deleteSiteBusiness}</span><br />
                <span className='delete-info'><strong>Nombre de la calle:</strong> {deleteSiteAddressStreet}</span><br />
                <span className='delete-info'><strong>Número de dirección:</strong> {deleteSiteAddressNum}</span><br />
                <span className='delete-info'><strong>Código postal:</strong> {deleteSiteAddressPC}</span><br />
                <span className='delete-info'><strong>Fecha de alta:</strong> {deleteSiteCreatedDate}</span>
            </Modal.Body>
            <Modal.Footer>
                <button className='modal-button' onClick={() => {deleteSite(); hideS()}}><FontAwesomeIcon icon={faWarning}/> Si, quiero eliminar esto.</button>
                <button className='modal-button no' onClick={() => {hideN()}}><FontAwesomeIcon icon={faCircleChevronLeft}/> No, regrésame a la tabla.</button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalSDelete;