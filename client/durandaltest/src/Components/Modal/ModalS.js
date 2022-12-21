import axios from 'axios';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
//import { Autocomplete, TextField } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "../../SCSS/Components/_modal.scss"

/*const options = [
    { label: 'The Godfather', id: 1 },
    { label: 'Pulp Fiction', id: 2 },
];*/

function ModalS(props) {
    const successAlert = () => {
        toast.success("Sitio creado exitosamente en la base de datos.", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
    
        });
      }
    
      const errorAlert = () => {
        toast.error("Error al crear sitio. Vuelve a intentarlo.", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
    
        });
      }

    function createSite () {
        
    }

    function hide(){
        props.onHide();
        successAlert();
        setTimeout(() => {
            window.location.reload();
        }, 3600);
        //alert("Contacto creado exitosamente en la base de datos.");
    }

    return (
        <Modal 
            {...props}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            backdropClassName="modal-backdrop"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Nuevo sitio
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <form>

            </form> 
            </Modal.Body>
            <Modal.Footer>
                <button className='save-modal-button' onClick={() => {createSite(); hide()}}>Guardar</button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalS;

/*

<div className='form-fields'>
    <div className='input-container'>
        <span className="input-span">Parent ID</span>
        <Autocomplete options={options} renderInput={(params) => <TextField {...params} placeholder="Buscar..." />}/>
    </div>
</div>

*/