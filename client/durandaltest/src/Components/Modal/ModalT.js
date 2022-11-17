import axios from 'axios';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import "../../SCSS/Components/_modal.scss"

function ModalT(props) {

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

    function createTech () {
        axios.post('http://localhost:3001/createTech', { // url to POST
            'Authorization': "bearer " + localStorage.getItem('token'),
            name: name,
            first_surname: firstSurname,
            second_surname: secondSurname,
            email: email,
            password: password
        })
        .then((response) => {
            console.log(response);
        }, (error) => {
            console.log(error);
            alert("Error al crear técnico. Vuelve a intentarlo.");
        });
    }

    function hide(){
        props.onHide();
        alert("Técnico creado exitosamente en la base de datos.");
        window.location.reload();
    }

    return (
        <Modal 
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Nuevo técnico
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <form>
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
            </form>
            </Modal.Body>
            <Modal.Footer>
                <button className='save-modal-button' onClick={() => {createTech(); hide()}}>Guardar</button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalT;