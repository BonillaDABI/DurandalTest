import axios from 'axios';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import "../../SCSS/Components/_modal.scss"

function ModalT(props) {

    axios.get("http://localhost:3001/autofillTechs", {
    })
    .then((response) => {
        const userTechInfo = JSON.stringify(response.data);
        //console.log(userInfo);
        localStorage.setItem("usersforTech", userTechInfo)
        //console.log(localStorage.getItem("users"));
    })
    
    var users = JSON.parse(localStorage.getItem("usersforTech"));
    //console.log(users);

    const [userId, setUserId] = useState("");

    function createTech () {
        axios.post('http://localhost:3001/createTech', { // url to POST
            'Authorization': "bearer " + localStorage.getItem('token'),
            user_id: userId
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
                <div className='form-fields-client'>
                    <div className='input-container'>
                        <span className="input-span">User ID</span>
                        <select className="input-field"  value={userId} onChange={(e) => setUserId(e.target.value)} required>
                        <option value="none" selected hidden className="options">Seleccionar...</option> 
                        {users.map((item, i) => {
                            return <option className="options" key={i} value={item.id}>{item.id}</option>
                        })};
                        </select>
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