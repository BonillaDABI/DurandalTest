import axios from 'axios';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import "../../SCSS/Components/_modal.scss"

function ModalT(props) {
    return (
        <Modal 
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Nuevo técnico
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                
            </Modal.Body>
            <Modal.Footer>
                <button className='save-modal-button' onClick={props.onHide}>Guardar</button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalT;