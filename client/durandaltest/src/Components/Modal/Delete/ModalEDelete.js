import axios from 'axios';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning, faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";
import "../../../SCSS/Components/_modal.scss"

function ModalEDelete(props) {
    var deleteEquipName = localStorage.getItem("equipNameToDelete");
    var deleteEquipBrand = localStorage.getItem("equipBrandToDelete");
    var deleteEquipUpdatedAt = localStorage.getItem("equipUpdatedAtToDelete");

    const deleteEquip = () => {
        var deleteEquipId = localStorage.getItem("equipIdToDelete");
        const response = axios.delete(`http://localhost:3001/deleteEquip/${deleteEquipId}`);
        console.log(deleteEquipId);
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
                    ¿Quieres borrar este equipo?
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <span className='delete-info'><strong>Nombre:</strong> {deleteEquipName}</span><br />
                <span className='delete-info'><strong>Marca:</strong> {deleteEquipBrand}</span><br />
                <span className='delete-info'><strong>Fecha de actualización:</strong> {deleteEquipUpdatedAt}</span>
            </Modal.Body>
            <Modal.Footer>
                <button className='modal-button' onClick={() => {deleteEquip(); hideS()}}><FontAwesomeIcon icon={faWarning}/> Si, quiero eliminar esto.</button>
                <button className='modal-button no' onClick={() => {hideN()}}><FontAwesomeIcon icon={faCircleChevronLeft}/> No, regrésame a la tabla.</button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalEDelete;