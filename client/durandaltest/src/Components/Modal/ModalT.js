import axios from 'axios';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "../../SCSS/Components/_modal.scss"

function ModalT(props) {
    const successAlert = () => {
        toast.success("Técnico creado exitosamente en la base de datos.", {
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
        toast.error("Error al crear técnico. Vuelve a intentarlo.", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
    
        });
      }
    /*axios.get("http://localhost:3001/autofillTechs", {
    })
    .then((response) => {
        const userTechInfo = JSON.stringify(response.data);
        //console.log(userInfo);
        localStorage.setItem("usersforTech", userTechInfo)
        //console.log(localStorage.getItem("users"));
    })
    
    var users = JSON.parse(localStorage.getItem("usersforTech"));
    //console.log(users);*/

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [firstSurname, setFirstSurname] = useState("");
    const [secondSurname, setSecondSurname] = useState("");
    const [password, setPW] = useState("");
    const [phone, setPhone] = useState("");
    const [nacimiento, setNacimiento] = useState("");

    function hide(){
        props.onHide();
        successAlert();
        setTimeout(() => {
            window.location.reload();
        }, 3600);
        //alert("Técnico creado exitosamente en la base de datos.");
    }

    function createTech () {
        axios.post('http://localhost:3001/createTech', { // url to POST
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
            hide();
        }, (error) => {
            console.log(error);
            errorAlert();
            //alert("Error al crear técnico. Vuelve a intentarlo.");
        });
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
                    Nuevo técnico
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <form id='techs-form'>
                <div className='form-fields' id="large-form-field">
                    <div className='input-container'>
                        <span className="input-span">Correo electrónico</span>
                        <input className="input-field" type="email" placeholder="Ingresar..." value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                </div>

                <div className='form-fields'>
                    <div className='input-container'>
                        <span className="input-span">Nombre(s)</span>
                        <input className="input-field" type="text" placeholder="Ingresar..." value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                </div>

                <div className='form-fields'>
                    <div className='input-container'>
                        <span className="input-span">Primer apellido</span>
                        <input className="input-field" type="text" placeholder="Ingresar..." value={firstSurname} onChange={(e) => setFirstSurname(e.target.value)} required />
                    </div>
                </div>

                <div className='form-fields'>
                    <div className='input-container'>
                        <span className="input-span">Segundo apellido</span>
                        <input className="input-field" type="text" placeholder="Ingresar..." value={secondSurname} onChange={(e) => setSecondSurname(e.target.value)} required />
                    </div>
                </div>

                <div className='form-fields'>
                    <div className='input-container'>
                        <span className="input-span">Contraseña</span>
                        <input className="input-field" type="password" placeholder="Ingresar..." value={password} onChange={(e) => setPW(e.target.value)} required />
                    </div>
                </div>
                <div className='form-fields'>
                    <div className='input-container'>
                        <span className="input-span">Teléfono</span>
                        <input className="input-field" type="text" placeholder="Ingresar..." value={phone} onChange={(e) => setPhone(e.target.value)} required />
                    </div>
                </div>
                <div className='form-fields'>
                    <div className='input-container'>
                        <span className="input-span">Fecha de nacimiento</span>
                        <input className="input-field" type="date" placeholder="Seleccionar..." value={nacimiento} onChange={(e) => setNacimiento(e.target.value)} required />
                    </div>
                </div>
            </form>
            </Modal.Body>
            <Modal.Footer>
                <button type="button" form='techs-form' className='save-modal-button' onClick={() => {createTech()}}>Guardar</button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalT;