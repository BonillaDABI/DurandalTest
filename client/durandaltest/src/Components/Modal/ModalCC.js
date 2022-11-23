import axios from 'axios';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
//import { Autocomplete, TextField } from '@mui/material';

import "../../SCSS/Components/_modal.scss"

/*const options = [
    { label: 'The Godfather', id: 1 },
    { label: 'Pulp Fiction', id: 2 },
];*/

function ModalCC(props) {
    

    function createContact () {
        
    }

    function hide(){
        props.onHide();
        alert("Contacto creado exitosamente en la base de datos.");
        window.location.reload();
    }

    return (
        <Modal 
            {...props}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Nuevo contacto
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <form className='contact-form'>

            </form> 
            </Modal.Body>
            <Modal.Footer>
                <button className='save-modal-button' onClick={() => {createContact(); hide()}}>Guardar</button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalCC;

/*

<div className='form-fields'>
    <div className='input-container'>
        <span className="input-span">Parent ID</span>
        <Autocomplete options={options} renderInput={(params) => <TextField {...params} placeholder="Buscar..." />}/>
    </div>
</div>

*/