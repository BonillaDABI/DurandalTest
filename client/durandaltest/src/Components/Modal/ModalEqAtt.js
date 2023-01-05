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

    const [name, setName] = useState("");
    const [dimensiones, setDimensiones] = useState("");
    const [description, setDescription] = useState("");
    const [value, setValor] = useState("");

    function createEquipAtt() {

        axios.post('http://localhost:3001/createEqAttr', { // url to POST
            'Authorization': "bearer " + localStorage.getItem('token'),
            name: name,
            dimensiones: dimensiones,
            description: description,
            equipment_id: localStorage.getItem('equipID'),
            value: value
        })
            .then((response) => {
                console.log(response);
                hide();
            }, (error) => {
                console.log(error);
                errorAlert();
                //alert("Error al crear atributo. Vuelve a intentarlo.");
            });

    }

    function hide() {
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
                    <div className='form-fields'>
                        <div className='input-container'>
                            <span className="input-span">Nombre</span>
                            <input className="input-field" type="text" placeholder="Ingresar..." value={name} onChange={(e) => setName(e.target.value)} required />
                        </div>
                    </div>
                    <div className='form-fields'>
                        <div className='input-container'>
                            <span className="input-span">Dimensiones</span>
                            <input className="input-field" type="text" placeholder="Ingresar..." value={dimensiones} onChange={(e) => setDimensiones(e.target.value)} required />
                        </div>
                    </div>
                    <div className='form-fields'>
                        <div className='input-container'>
                            <span className="input-span">Valor</span>
                            <input className="input-field" type="text" placeholder="Ingresar..." value={value} onChange={(e) => setValor(e.target.value)} required />
                        </div>
                    </div>
                    <div id="description-field" className='form-fields'>
                        <div className='input-container'>
                            <span className="input-span">Descripción</span>
                            <input className="input-field" type="text" placeholder="Ingresar..." value={description} onChange={(e) => setDescription(e.target.value)} required />
                        </div>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <button type='submit' form='att-form' className='save-modal-button' onClick={() => { createEquipAtt() }}>Guardar</button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalEqAtt;