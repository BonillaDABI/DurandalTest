import axios from 'axios';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning, faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";
import "../../../SCSS/Components/_modal.scss"

function ModalADelete(props) {
    // var deleteTechName = localStorage.getItem("techNameToDelete");
    // var deleteTechEmail = localStorage.getItem("techEmailToDelete");
    // var deleteTechCreatedDate = localStorage.getItem("techCreatedDateToDelete");
    // var deleteTechPhone = localStorage.getItem("techPhoneToDelete");

    const deleteAsset = () => {
        var deleteAssetId = localStorage.getItem("assetIdToDelete");
        const response = axios.delete(`http://localhost:3001/deleteAsset/${deleteAssetId}`);
        console.log(deleteAssetId);
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
                    ¿Quieres borrar este asset?
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* <span className='delete-info'><strong>Nombre:</strong> {deleteTechName}</span><br />
                <span className='delete-info'><strong>Email:</strong> {deleteTechEmail}</span><br />
                <span className='delete-info'><strong>Teléfono:</strong> {deleteTechPhone}</span><br />
                <span className='delete-info'><strong>Fecha de alta:</strong> {deleteTechCreatedDate}</span> */}
            </Modal.Body>
            <Modal.Footer>
                <button className='modal-button' onClick={() => {deleteAsset(); hideS()}}><FontAwesomeIcon icon={faWarning}/> Si, quiero eliminar esto.</button>
                <button className='modal-button no' onClick={() => {hideN()}}><FontAwesomeIcon icon={faCircleChevronLeft}/> No, regrésame a la tabla.</button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalADelete;