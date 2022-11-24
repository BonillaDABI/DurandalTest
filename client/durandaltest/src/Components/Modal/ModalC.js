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

function ModalC(props) {
    const successAlert = () => {
        toast.success("Cliente creado exitosamente en la base de datos.", {
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
        toast.error("Error al crear cliente. Vuelve a intentarlo.", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
    
        });
      }

    axios.get("http://localhost:3001/autofillClients", {
    })
    .then((response) => {
        const clientInfo = JSON.stringify(response.data);
        //console.log(clientInfo);
        localStorage.setItem("clients", clientInfo)
        //console.log(localStorage.getItem("clients"));
    })
    
    var clients = JSON.parse(localStorage.getItem("clients"));
    //console.log(clients)
    //console.log(clients.availableClients)
    
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [firstSurname, setFirstSurname] = useState("");
    const [secondSurname, setSecondSurname] = useState("");
    const [password, setPW] = useState("");

    const [business, setBusiness] = useState("");
    const [rfc, setRFC] = useState("");
    const [taxId, setTaxId] = useState("");
    const [parentId, setParentId] = useState("");

    function createClient () {
        axios.post('http://localhost:3001/createClient', {
            'Authorization': "bearer " + localStorage.getItem('token'),
            name: name,
            first_surname: firstSurname,
            second_surname: secondSurname,
            email: email,
            password: password,
            business_name: business,
            rfc: rfc,
            tax_id: taxId
        })
        .then((response) => {
            console.log(response);
        }, (error) => {
            console.log(error);
            errorAlert();
            //alert("Error al crear cliente. Vuelve a intentarlo.");
        });
    }

    function hide(){
        props.onHide();
        successAlert();
        setTimeout(() => {
            window.location.reload();
        }, 3600);
        //alert("Cliente creado exitosamente en la base de datos.");
    }

    return (
        <Modal 
            {...props}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Nuevo cliente
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <form className='client-form'>
                <div className='form-fields' id="large-form-field">
                    <div className='input-container'>
                        <span className="input-span">Nombre del negocio</span>
                        <input className="input-field" type="text" placeholder="Ingresar..." value={business} onChange={(e) => setBusiness(e.target.value)} required />
                    </div>
                </div>

                <div className='form-fields'>
                    <div className='input-container'>
                        <span className="input-span">RFC</span>
                        <input className="input-field" type="text" placeholder="Ingresar..." value={rfc} onChange={(e) => setRFC(e.target.value)} required />
                    </div>
                </div>

                <div className='form-fields'>
                    <div className='input-container'>
                        <span className="input-span">Tax ID</span>
                        <select className="input-field"  value={taxId} onChange={(e) => setTaxId(e.target.value)} required>
                            <option value="" disabled hidden className="options">Seleccionar...</option> 
                            {clients.activeTaxes.map((item, i) => {
                                return <option className="options" key={i} value={item.id}>{item.name}</option>
                            })};
                        </select>
                    </div>
                </div>
                
                <div className='form-divider'></div>
                
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
                        <input className="input-field" type="password" placeholder="Ingresar..." value={password} onChange={(e) => setPW(e.target.value)} required />
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

/*

<div className='form-fields'>
    <div className='input-container'>
        <span className="input-span">Parent ID</span>
        <Autocomplete options={options} renderInput={(params) => <TextField {...params} placeholder="Buscar..." />}/>
    </div>
</div>

*/

/*
<div className='form-fields'>
    <div className='input-container'>
        <span className="input-span">Parent ID</span>
        <input list='parents' name='parent' id='parent' className="input-field"/>
        <datalist id="parents"   value={parentId} onChange={(e) => setParentId(e.target.value)} required > 
            <option value="" className="options">Ninguna</option> 
            {clients.parentsID.map((item, i) => {
                return <option className="options" key={i} value={item.id}>{item.business_name}</option>
            })};
        </datalist>
    </div>
</div>

*/