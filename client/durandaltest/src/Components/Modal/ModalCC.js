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

function ModalCC(props) {
    const successAlert = () => {
        toast.success("Contacto creado exitosamente en la base de datos.", {
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
        toast.error("Error al crear contacto. Vuelve a intentarlo.", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
    
        });
      }

      const [email, setEmail] = useState("");
      const [name, setName] = useState("");
      const [firstSurname, setFirstSurname] = useState("");
      const [secondSurname, setSecondSurname] = useState("");
      const [password, setPW] = useState("");
      const [contactTypeId, setContactTypeId] = useState("");

      function hide(){
        props.onHide();
        successAlert();
        setTimeout(() => {
            window.location.reload();
        }, 3600);
        //alert("Contacto creado exitosamente en la base de datos.");
    }

    function createContact () {
        var client_id = localStorage.getItem("client_id");

        axios.post(`http://localhost:3001/extraContact/${client_id}`, {
            'Authorization': "bearer " + localStorage.getItem('token'),
            name: name,
            first_surname: firstSurname,
            second_surname: secondSurname,
            email: email,
            password: password,
            contact_type_id: contactTypeId
        })
        .then((response) => {
            console.log(response);
            hide();
        }, (error) => {
            console.log(error);
            errorAlert();
            //alert("Error al crear cliente. Vuelve a intentarlo.");
        });
    }

    var business_name = localStorage.getItem("business_name");
    //console.log(business_name);
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
                    Nuevo contacto
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <form className='contact-form' id='cc-form'>
                <div className='form-fields' id="large-form-field">
                    <div className='input-container'>
                        <span className="input-span">Cliente</span>
                        <input className="input-field" type="text" placeholder={business_name} disabled />
                    </div>
                </div>
                <div className='form-fields'>
                    <div className='input-container'>
                        <span className="input-span">Nombre(s)</span>
                        <input className="input-field" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ingresar..." required />
                    </div>
                </div>

                <div className='form-fields'>
                    <div className='input-container'>
                        <span className="input-span">Primer apellido</span>
                        <input className="input-field" type="text" value={firstSurname} onChange={(e) => setFirstSurname(e.target.value)} placeholder="Ingresar..." required />
                    </div>
                </div>

                <div className='form-fields'>
                    <div className='input-container'>
                        <span className="input-span">Segundo apellido</span>
                        <input className="input-field" type="text" value={secondSurname} onChange={(e) => setSecondSurname(e.target.value)} placeholder="Ingresar..." required />
                    </div>
                </div>

                <div className='form-fields'>
                    <div className='input-container'>
                        <span className="input-span">Correo electrónico</span>
                        <input className="input-field" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Ingresar..." required />
                    </div>
                </div>

                <div className='form-fields'>
                    <div className='input-container'>
                        <span className="input-span">Contraseña</span>
                        <input className="input-field" type="password" value={password} onChange={(e) => setPW(e.target.value)} placeholder="Ingresar..." required />
                    </div>
                </div>

                <div className='form-fields'>
                    <div className='input-container'>
                        <span className="input-span">Tipo de Contacto</span>
                        <select className="input-field" value={contactTypeId} onChange={(e) => setContactTypeId(e.target.value)} required>
                            <option value="" selected disabled className="options">Seleccionar...</option> 
                            <option value="1" className="options">Principal</option>
                            <option value="2" className="options">Secundario</option>
                        </select>
                    </div>
                </div>

            </form> 
            </Modal.Body>
            <Modal.Footer>
                <button type="button" form='cc-form' className='save-modal-button' onClick={() => {createContact()}}>Guardar</button>
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