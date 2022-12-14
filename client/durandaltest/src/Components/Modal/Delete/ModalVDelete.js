import axios from 'axios';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning, faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";
import "../../../SCSS/Components/_modal.scss"

function ModalVDelete(props) {
    var deleteVisitName = localStorage.getItem("visitNameToDelete");
    var deleteVisitSiteName = localStorage.getItem("visitSiteNameToDelete");
    var deleteVisitTypeName = localStorage.getItem("visitTypeNameToDelete");
    var deleteVisitTech = localStorage.getItem("visitTechToDelete");
    var deleteVisitUpdatedDate = localStorage.getItem("visitUpdatedDateToDelete");


    const deleteVisit = () => {
        var deleteVisitId = localStorage.getItem("visitIdToDelete");
        const response = axios.delete(`http://localhost:3001/deleteVisit/${deleteVisitId}`);
        console.log(deleteVisitId);
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
                    ¿Quieres borrar esta visita?
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <span className='delete-info'><strong>Nombre de visita:</strong> {deleteVisitName}</span><br />
                <span className='delete-info'><strong>Sitio:</strong> {deleteVisitSiteName}</span><br />
                <span className='delete-info'><strong>Tipo de visita:</strong> {deleteVisitTypeName}</span><br />
                <span className='delete-info'><strong>Técnico:</strong> {deleteVisitTech}</span><br />
                <span className='delete-info'><strong>Fecha de actualización:</strong> {deleteVisitUpdatedDate}</span>
            </Modal.Body>
            <Modal.Footer>
                <button className='modal-button' onClick={() => {deleteVisit(); hideS()}}><FontAwesomeIcon icon={faWarning}/> Si, quiero eliminar esto.</button>
                <button className='modal-button no' onClick={() => {hideN()}}><FontAwesomeIcon icon={faCircleChevronLeft}/> No, regrésame a la tabla.</button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalVDelete;