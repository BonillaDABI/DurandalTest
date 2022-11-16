import axios from 'axios';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import "../../SCSS/Components/_modal.scss"

function ModalC(props) {
    axios.get("http://localhost:3001/autofillParentsID", {
    })
    .then((response) => {
        const parentInfo = JSON.stringify(response.data);
        //console.log(parentInfo);
        localStorage.setItem("parents", parentInfo)
        //console.log(localStorage.getItem("parents"));
    })
    
    var parents = JSON.parse(localStorage.getItem("parents"));
    //console.log(parents)

    axios.get("http://localhost:3001/autofillClients", {
    })
    .then((response) => {
        const userInfo = JSON.stringify(response.data);
        //console.log(userInfo);
        localStorage.setItem("users", userInfo)
        //console.log(localStorage.getItem("users"));
    })
    
    var users = JSON.parse(localStorage.getItem("users"));
    //console.log(users)
    //console.log(users.availableClients)
    
    const [business, setBusiness] = useState("");
    const [userId, setUserId] = useState("");
    const [rfc, setRFC] = useState("");
    const [taxId, setTaxId] = useState("");
    const [parentId, setParentId] = useState("");

    function createClient () {
        axios.post('http://localhost:3001/createClient', {
            'Authorization': "bearer " + localStorage.getItem('token'),
            business_name: business,
            user_id: userId,
            rfc: rfc,
            tax_id: taxId,
            parent_id: parentId
        })
        .then((response) => {
            console.log(response);
        }, (error) => {
            console.log(error);
            alert("Error al crear cliente. Vuelve a intentarlo.");
        });
    }

    function hide(){
        props.onHide();
        alert("Cliente creado exitosamente en la base de datos.");
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
                    Nuevo cliente
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <form>
                <div className='form-fields-client'>
                    <div className='input-container'>
                        <span className="input-span">Nombre del negocio</span>
                        <input className="input-field" type="text" placeholder="Ingresar..." value={business} onChange={(e) => setBusiness(e.target.value)} required />
                    </div>
                </div>

                <div className='form-fields-client'>
                    <div className='input-container'>
                        <span className="input-span">User ID</span>
                        <select className="input-field"  value={userId} onChange={(e) => setUserId(e.target.value)} required>
                        <option value="none" selected hidden className="options">Seleccionar...</option> 
                        {users.availableClients.map((item, i) => {
                            return <option className="options" key={i} value={item.id}>{item.id}</option>
                        })};
                        </select>
                    </div>
                </div>

                <div className='form-fields-client'>
                    <div className='input-container'>
                        <span className="input-span">RFC</span>
                        <input className="input-field" type="text" placeholder="Ingresar..." value={rfc} onChange={(e) => setRFC(e.target.value)} required />
                    </div>
                </div>

                <div className='form-fields-client'>
                    <div className='input-container'>
                        <span className="input-span">Tax ID</span>
                        <select className="input-field"  value={taxId} onChange={(e) => setTaxId(e.target.value)} required>
                        <option value="none" selected hidden className="options">Seleccionar...</option> 
                        {users.activeTaxes.map((item, i) => {
                            return <option className="options" key={i} value={item.id}>{item.name}</option>
                        })};
                        </select>
                    </div>
                </div>

                <div className='form-fields-client'>
                    <div className='input-container'>
                        <span className="input-span">Parent ID</span>
                        <select className="input-field"  value={parentId} onChange={(e) => setParentId(e.target.value)} required> 
                        <option value="none" selected hidden className="options">Seleccionar...</option>
                        {parents.map((item, i) => {
                            return <option className="options" key={i} value={item.id}>{item.id}</option>
                        })};
                        </select>
                    </div>
                </div>
            </form> 
            </Modal.Body>
            <Modal.Footer>
                <button className='save-modal-button' onClick={() => {createClient(); hide()}}>Guardar</button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalC;