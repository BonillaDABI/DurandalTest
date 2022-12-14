import axios from 'axios';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning, faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";
import "../../../SCSS/Components/_modal.scss"

function ModalUDelete(props) {
    var deleteUserName = localStorage.getItem("userNameToDelete");
    var deleteUserEmail = localStorage.getItem("userEmailToDelete");
    var deleteUserCreatedDate = localStorage.getItem("userCreatedDateToDelete");

    const deleteUser = () => {
        var deleteUserId = localStorage.getItem("userIdToDelete");
        const response = axios.delete(`http://localhost:3001/delete/${deleteUserId}`);
        console.log(deleteUserId);
    }

    function hideS() {
        props.onHide();
        window.location.reload();
    }

    function hideN() {
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
                    ¿Quieres borrar este usuario?
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <span className='delete-info'><strong>Nombre:</strong> {deleteUserName}</span><br />
                <span className='delete-info'><strong>Email:</strong> {deleteUserEmail}</span><br />
                <span className='delete-info'><strong>Fecha de alta:</strong> {deleteUserCreatedDate}</span>
            </Modal.Body>
            <Modal.Footer>
                <button className='modal-button' onClick={() => { deleteUser(); hideS() }}><FontAwesomeIcon icon={faWarning} /> Si, quiero eliminar esto.</button>
                <button className='modal-button no' onClick={() => { hideN() }}><FontAwesomeIcon icon={faCircleChevronLeft} /> No, regrésame a la tabla.</button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalUDelete;