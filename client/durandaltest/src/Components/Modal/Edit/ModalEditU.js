import Modal from 'react-bootstrap/Modal';
import "../../../SCSS/Components/_modal.scss"

function ModalEditU(props) {
    return (
        <Modal 
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Editar usuario
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                
            </Modal.Body>
            <Modal.Footer>
                <button className='save-modal-button' onClick={props.onHide}>Guardar cambios</button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalEditU;