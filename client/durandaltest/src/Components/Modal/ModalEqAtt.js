import axios from 'axios';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "../../SCSS/Components/_modal.scss"

function ModalEqAtt(props) {
    const successAlert = () => {
        toast.success("Atributo creado exitosamente en la base de datos.", {
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
        toast.error("Error al crear atributo. Vuelve a intentarlo.", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
    
        });
      }

    function createEquipAtt () {
        
        // axios.post('http://localhost:3001/createEquip', { // url to POST
        //     'Authorization': "bearer " + localStorage.getItem('token'),
        //     name: name,
        //     brand_id: brandId,
        //     description: description
        // })
        // .then((response) => {
        //     console.log(response);
        //     hide();
        // }, (error) => {
        //     console.log(error);
        //     errorAlert();
        //     //alert("Error al crear atributo. Vuelve a intentarlo.");
        // });
        
    }

    function hide(){
        props.onHide();
        successAlert();
        setTimeout(() => {
            window.location.reload();
        }, 3600);
        //alert("Atributo creado exitosamente en la base de datos.");
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
                <Modal.Title id="contained-modal-title-vcenter">
                    Nuevo atributo
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <form id='att-form'>
                
            </form>
            </Modal.Body>
            <Modal.Footer>
                <button type='submit' form='att-form' className='save-modal-button' onClick={() => {createEquipAtt()}}>Guardar</button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalEqAtt;