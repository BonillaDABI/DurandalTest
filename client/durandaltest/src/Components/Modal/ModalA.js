import axios from 'axios';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "../../SCSS/Components/_modal.scss"

function ModalA(props) {
    const successAlert = () => {
        toast.success("Asset creado exitosamente en la base de datos.", {
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
        toast.error("Error al crear asset. Vuelve a intentarlo.", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
    
        });
      }
    
    /*
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [firstSurname, setFirstSurname] = useState("");
    const [secondSurname, setSecondSurname] = useState("");
    const [password, setPW] = useState("");
    const [phone, setPhone] = useState("");
    const [nacimiento, setNacimiento] = useState("");
    */

    function createAsset () {
        /*
        axios.post('http://localhost:3001/createAsset', { // url to POST
            'Authorization': "bearer " + localStorage.getItem('token'),
            name: name,
            first_surname: firstSurname,
            second_surname: secondSurname,
            email: email,
            password: password,
            telefono: phone,
            fechaNacimiento: nacimiento
        })
        .then((response) => {
            console.log(response);
        }, (error) => {
            console.log(error);
            errorAlert();
            //alert("Error al crear técnico. Vuelve a intentarlo.");
        });
        */
    }

    function hide(){
        props.onHide();
        successAlert();
        setTimeout(() => {
            window.location.reload();
        }, 3600);
        //alert("Técnico creado exitosamente en la base de datos.");
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
                    Nuevo asset
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            
            </Modal.Body>
            <Modal.Footer>
                <button className='save-modal-button' onClick={() => {createAsset(); hide()}}>Guardar</button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalA;