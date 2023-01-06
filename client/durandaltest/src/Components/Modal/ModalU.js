import axios from 'axios';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "../../SCSS/Components/_modal.scss"

function ModalU(props) {
    // axios.get("http://localhost:3001/autofillRoles")
    const successAlert = () => {
        toast.success("Usuario creado exitosamente en la base de datos.", {
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
        toast.error("Error al crear usuario. Vuelve a intentarlo.", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
    
        });
      }
    
    axios.get("http://localhost:3001/autofillRoles", {
    })
    .then((response) => {
        const rolesInfo = JSON.stringify(response.data);
        //console.log(rolesInfo);
        localStorage.setItem("roles", rolesInfo)
        //console.log(localStorage.getItem("roles"));
    })
    
    var roles = JSON.parse(localStorage.getItem("roles"));
    //console.log(roles)
    
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [firstSurname, setFirstSurname] = useState("");
    const [secondSurname, setSecondSurname] = useState("");
    const [password, setPW] = useState("");
    const [role, setRole] = useState("");

    function hide(){
        props.onHide();
        successAlert();
        setTimeout(() => {
            window.location.reload();
        }, 3600);
        //alert("Usuario creado exitosamente en la base de datos.");
    }

    function createUser () {
        axios.post('http://localhost:3001/register', { // url to POST
        //user_name: userName,
        'Authorization': "bearer " + localStorage.getItem('token'),
        name: name,
        first_surname: firstSurname,
        second_surname: secondSurname,
        email: email,
        password: password,
        roles_id: role

        })
        .then((response) => {
            console.log(response);
            hide();
        }, (error) => {
            console.log(error);
            errorAlert();
            //alert("Error al crear usuario. Vuelve a intentarlo.");
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
                <Modal.Title className="modal-title" id="contained-modal-title-vcenter">
                    Nuevo usuario
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <form id='users-form'>
                <div className='form-fields'>
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
                        <span className="input-span">Rol</span>
                        <select className="input-field"  value={role} onChange={(e) => setRole(e.target.value)} required>
                        <option value="" selected disabled hidden className="options">Seleccionar...</option> 
                        {roles.map((item, i) => {
                            return <option className="options" key={i} value={item.id}>{item.role_name}</option>
                        })};
                        </select>
                    </div>
                </div>
            </form>
            </Modal.Body>
            <Modal.Footer>
                <button type="button" form='users-form' className='save-modal-button' onClick={() => {createUser()}}>Guardar</button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalU;