import axios from 'axios';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning, faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";
import "../../../SCSS/Components/_modal.scss"

function ModalCCDelete(props) {
    var deleteContactName = localStorage.getItem("contactNameToDelete");
    var deleteContactEmail = localStorage.getItem("contactEmailToDelete");
    var deleteContactBusiness = localStorage.getItem("contactBusinessToDelete");
    var deleteContactCreatedDate = localStorage.getItem("contactCreatedDateToDelete");

    const deleteContact = () => {
        var deleteContactId = localStorage.getItem("contactIdToDelete");
        const response = axios.delete(`http://localhost:3001/deleteCont/${deleteContactId}`);
        console.log(deleteContactId);
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
                    ¿Quieres borrar este contacto?
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <span className='delete-info'><strong>Nombre:</strong> {deleteContactName}</span><br />
                <span className='delete-info'><strong>Email:</strong> {deleteContactEmail}</span><br />
                <span className='delete-info'><strong>Cliente:</strong> {deleteContactBusiness}</span><br />
                <span className='delete-info'><strong>Fecha de alta:</strong> {deleteContactCreatedDate}</span>
            </Modal.Body>
            <Modal.Footer>
                <button className='modal-button' onClick={() => {deleteContact(); hideS()}}><FontAwesomeIcon icon={faWarning}/> Si, quiero eliminar esto.</button>
                <button className='modal-button no' onClick={() => {hideN()}}><FontAwesomeIcon icon={faCircleChevronLeft}/> No, regrésame a la tabla.</button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalCCDelete;