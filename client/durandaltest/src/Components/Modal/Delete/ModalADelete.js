import axios from 'axios';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning, faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";
import "../../../SCSS/Components/_modal.scss"

function ModalADelete(props) {
    var deleteAssetName = localStorage.getItem("assetNameToDelete");
    var deleteAssetEquipName = localStorage.getItem("assetEquipNameToDelete");
    var deleteAssetUpdatedDate = localStorage.getItem("assetUpdatedDateToDelete");
    var deleteAssetClientSite = localStorage.getItem("assetClientSiteToDelete");
    
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
                <span className='delete-info'><strong>Nombre del asset:</strong> {deleteAssetName}</span><br />
                <span className='delete-info'><strong>Nombre del equipo:</strong> {deleteAssetEquipName}</span><br />
                <span className='delete-info'><strong>Sitio:</strong> {deleteAssetClientSite}</span><br />
                <span className='delete-info'><strong>Fecha de actualización:</strong> {deleteAssetUpdatedDate}</span>
            </Modal.Body>
            <Modal.Footer>
                <button className='modal-button' onClick={() => {deleteAsset(); hideS()}}><FontAwesomeIcon icon={faWarning}/> Si, quiero eliminar esto.</button>
                <button className='modal-button no' onClick={() => {hideN()}}><FontAwesomeIcon icon={faCircleChevronLeft}/> No, regrésame a la tabla.</button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalADelete;