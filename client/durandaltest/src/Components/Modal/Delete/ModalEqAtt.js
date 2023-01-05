import axios from 'axios';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning, faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";
import "../../../SCSS/Components/_modal.scss"

function ModalEqAttDelete(props) {
    // var deleteItemName = localStorage.getItem("itemNameToDelete");
    // var deleteItemCurrency = localStorage.getItem("itemCurrencyToDelete");
    // var deleteItemUnit = localStorage.getItem("itemUnitToDelete");
    // var deleteItemUpdatedDate = localStorage.getItem("itemUpdatedDateToDelete");


    const deleteAtt = () => {
        // var deleteAttId = localStorage.getItem("itemIdToDelete");
        // const response = axios.delete(`http://localhost:3001/deleteItem/${deleteItemId}`);
        // console.log(deleteItemId);
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
                    ¿Quieres borrar este atributo?
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

            </Modal.Body>
            <Modal.Footer>
                <button className='modal-button' onClick={() => {deleteAtt(); hideS()}}><FontAwesomeIcon icon={faWarning}/> Si, quiero eliminar esto.</button>
                <button className='modal-button no' onClick={() => {hideN()}}><FontAwesomeIcon icon={faCircleChevronLeft}/> No, regrésame a la tabla.</button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalEqAttDelete;