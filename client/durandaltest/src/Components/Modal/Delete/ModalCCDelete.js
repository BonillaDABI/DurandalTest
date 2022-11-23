import axios from 'axios';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import "../../../SCSS/Components/_modal.scss"

function ModalCCDelete(props) {
    const deleteContact = (name) => {

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
            size="ls"
            aria-labelledby="contained-modal-title-vcenter"
            backdropClassName
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title className="modal-title" id="contained-modal-title-vcenter">
                    ¿Quieres borrar este contacto?
                </Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <button className='save-modal-button' onClick={() => {deleteContact(); hideS()}}>Si</button>
                <button className='save-modal-button' onClick={() => {hideN()}}>No</button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalCCDelete;