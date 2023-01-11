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

function ModalS(props) {
    const successAlert = () => {
        toast.success("Sitio creado exitosamente en la base de datos.", {
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
        toast.error("Error al crear sitio. Vuelve a intentarlo.", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
    
        });
      }

    var countries = JSON.parse(localStorage.getItem("countries"));
    var states = JSON.parse(localStorage.getItem("states"));
    var cities = JSON.parse(localStorage.getItem("cities"));
    var colonies = JSON.parse(localStorage.getItem("colonies"));

    const [name, setName] = useState("");
    const [addressStreet, setAddressStreet] = useState("");
    const [addressNumber, setAddressNumber] = useState("");
    const [addressColonyId, setAddressColonyId] = useState("");
    const [addressCityId, setAddressCityId] = useState("");
    const [addressStateId, setAddressStateId] = useState("");
    const [addressCountryId, setAddressCountryId] = useState("");
    const [addressPC, setAddressPC] = useState("");

    function createSite () {
        var client_id = localStorage.getItem("client_id")
        axios.post(`http://localhost:3001/createSite/${client_id}`, { // url to POST
            'Authorization': "bearer " + localStorage.getItem('token'),
            name: name,
            address_street: addressStreet,
            address_number: addressNumber,
            address_colony_id: addressColonyId,
            address_city_id: addressCityId,
            address_state_id: addressStateId,
            address_country_id: addressCountryId,
            address_postal_code: addressPC
        })
            .then((response) => {
                // console.log(response);
                hide();
            }, (error) => {
                console.log(error);
                errorAlert();
                //alert("Error al crear atributo. Vuelve a intentarlo.");
            });
    }

    function hide(){
        props.onHide();
        successAlert();
        setTimeout(() => {
            window.location.reload();
        }, 3600);
        //alert("Contacto creado exitosamente en la base de datos.");
    }

    var business_name = localStorage.getItem("business_name");
    
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
                    Nuevo sitio
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <form id='site-form'>
                <div className='form-fields' id="large-form-field">
                    <div className='input-container'>
                        <span className="input-span">Cliente</span>
                        <input className="input-field" type="text" placeholder={business_name} disabled />
                    </div>
                </div>
                <div className='form-fields' id="large-form-field">
                    <div className='input-container'>
                        <span className="input-span">Nombre del sitio</span>
                        <input className="input-field" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ingresar..." required />
                    </div>
                </div>
                <div className='form-fields'>
                    <div className='input-container'>
                        <span className="input-span">País</span>
                        <select className="input-field"  value={addressCountryId} onChange={(e) => setAddressCountryId(e.target.value)} required>
                            <option value="" disabled hidden className="options">Seleccionar...</option> 
                            {countries.map((item, i) => {
                                return <option className="options" key={i} value={item.id}>{item.name}</option>
                            })};
                        </select>
                    </div>
                </div>
                <div className='form-fields'>
                    <div className='input-container'>
                        <span className="input-span">Estado</span>
                        <select className="input-field"  value={addressStateId} onChange={(e) => setAddressStateId(e.target.value)} required>
                            <option value="" disabled hidden className="options">Seleccionar...</option> 
                            {states.map((item, i) => {
                                return <option className="options" key={i} value={item.id}>{item.name}</option>
                            })};
                        </select>
                    </div>
                </div>
                <div className='form-fields'>
                    <div className='input-container'>
                        <span className="input-span">Ciudad</span>
                        <select className="input-field"  value={addressCityId} onChange={(e) => setAddressCityId(e.target.value)} required>
                            <option value="" disabled hidden className="options">Seleccionar...</option> 
                            {cities.map((item, i) => {
                                return <option className="options" key={i} value={item.id}>{item.name}</option>
                            })};
                        </select>
                    </div>
                </div>
                <div className='form-fields'>
                    <div className='input-container'>
                        <span className="input-span">Colonia</span>
                        <select className="input-field"  value={addressColonyId} onChange={(e) => setAddressColonyId(e.target.value)} required>
                            <option value="" disabled hidden className="options">Seleccionar...</option> 
                            {colonies.map((item, i) => {
                                return <option className="options" key={i} value={item.id}>{item.name}</option>
                            })};
                        </select>
                    </div>
                </div>
                <div className='form-fields' id="large-form-field">
                    <div className='input-container'>
                        <span className="input-span">Nombre de la calle</span>
                        <input className="input-field" type="text" value={addressStreet} onChange={(e) => setAddressStreet(e.target.value)} placeholder="Ingresar..." required />
                    </div>
                </div>
                <div className='form-fields'>
                    <div className='input-container'>
                        <span className="input-span">Número de dirección</span>
                        <input className="input-field" type="number" value={addressNumber} onChange={(e) => setAddressNumber(e.target.value)} placeholder="Ingresar..." required />
                    </div>
                </div>
                <div className='form-fields'>
                    <div className='input-container'>
                        <span className="input-span">Código postal</span>
                        <input className="input-field" type="number" value={addressPC} onChange={(e) => setAddressPC(e.target.value)} placeholder="Ingresar..." required />
                    </div>
                </div>
            </form> 
            </Modal.Body>
            <Modal.Footer>
                <button type='button' className='save-modal-button' form='site-form' onClick={() => {createSite(); hide()}}>Guardar</button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalS;

/*

<div className='form-fields'>
    <div className='input-container'>
        <span className="input-span">Parent ID</span>
        <Autocomplete options={options} renderInput={(params) => <TextField {...params} placeholder="Buscar..." />}/>
    </div>
</div>

*/