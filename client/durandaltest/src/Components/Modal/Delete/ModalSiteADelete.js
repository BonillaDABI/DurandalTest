import axios from 'axios';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning, faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";
import "../../../SCSS/Components/_modal.scss"

function ModalSiteADelete(props) {
    var deleteEquipAttName = localStorage.getItem("equipAttNameToDelete");
    var deleteEquipAttDim = localStorage.getItem("equipAttDimToDelete");
    var deleteEquipAttVal = localStorage.getItem("equipAttValToDelete");

    const deleteAsset = () => {
        // var deleteAttId = localStorage.getItem("equipAttIdToDelete");
        // console.log(deleteAttId);
        // const response = axios.delete(`http://localhost:3001/deleteAttr/${deleteAttId}`);
        // console.log(deleteItemId);
    } 
    
    function hideS(){
        props.onHide();
        //window.location.reload();
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
      
            </Modal.Body>
            <Modal.Footer>
                <button className='modal-button' onClick={() => {deleteAsset(); hideS()}}><FontAwesomeIcon icon={faWarning}/> Si, quiero eliminar esto.</button>
                <button className='modal-button no' onClick={() => {hideN()}}><FontAwesomeIcon icon={faCircleChevronLeft}/> No, regrésame a la tabla.</button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalSiteADelete;