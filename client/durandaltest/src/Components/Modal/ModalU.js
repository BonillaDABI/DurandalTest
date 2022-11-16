import axios from 'axios';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import "../../SCSS/Components/_modal.scss"

function ModalU(props) {
    // axios.get("http://localhost:3001/autofillRoles")
    
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
        }, (error) => {
            console.log(error);
            alert("Error al crear usuario. Vuelve a intentarlo.");
        });
    } 
    
    function hide(){
        props.onHide();
        alert("Usuario creado exitosamente en la base de datos.");
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
                <Modal.Title className="modal-title" id="contained-modal-title-vcenter">
                    Nuevo usuario
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <form>
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
                        <span className="input-span">Apellido paterno</span>
                        <input className="input-field" type="text" placeholder="Ingresar..." value={firstSurname} onChange={(e) => setFirstSurname(e.target.value)} required />
                    </div>
                </div>

                <div className='form-fields'>
                    <div className='input-container'>
                        <span className="input-span">Apellido materno</span>
                        <input className="input-field" type="text" placeholder="Ingresar..." value={secondSurname} onChange={(e) => setSecondSurname(e.target.value)} required />
                    </div>
                </div>

                <div className='form-fields'>
                    <div className='input-container'>
                        <span className="input-span">Contraseña</span>
                        <input className="input-field" type="text" placeholder="Ingresar..." value={password} onChange={(e) => setPW(e.target.value)} required />
                    </div>
                </div>

                <div className='form-fields'>
                    <div className='input-container'>
                        <span className="input-span">Rol</span>
                        <select className="input-field"  value={role} onChange={(e) => setRole(e.target.value)} required>
                        <option value="none" selected hidden className="options">Seleccionar...</option> 
                        {roles.map((item, i) => {
                            return <option className="options" key={i} value={item.id}>{item.role_name}</option>
                        })};
                        </select>
                    </div>
                </div>
            </form>
            </Modal.Body>
            <Modal.Footer>
                <button className='save-modal-button' onClick={() => {createUser(); hide()}}>Guardar</button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalU;