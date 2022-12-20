import axios from 'axios';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "../../SCSS/Components/_modal.scss"

function ModalI(props) {
    const successAlert = () => {
        toast.success("Item creado exitosamente en la base de datos.", {
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
        toast.error("Error al crear item. Vuelve a intentarlo.", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
    
        });
      }

      axios.get("http://localhost:3001/autofillCurrenciesAndUnits", {
      })
      .then((response) => {
        //console.log(response.data.currencies)
        const currInfo = JSON.stringify(response.data.currencies);
        const unitsInfo = JSON.stringify(response.data.units);

        console.log(currInfo);
        console.log(unitsInfo);
        localStorage.setItem("currencies", currInfo)
        localStorage.setItem("units", unitsInfo)
    })
    
    var currencies = JSON.parse(localStorage.getItem("currencies"));
    var units = JSON.parse(localStorage.getItem("units"));
    
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [cost, setCost] = useState("");
    const [unitId, setUnit] = useState("");
    const [currencyId, setCurrency] = useState("");
    

    function createItem () {
        axios.post('http://localhost:3001/createItem', { // url to POST
            'Authorization': "bearer " + localStorage.getItem('token'),
            name: name,
            description: description,
            cost: cost,
            unit_id: unitId,
            currency_id: currencyId
        })
        .then((response) => {
            console.log(response);
        }, (error) => {
            console.log(error);
            errorAlert();
            //alert("Error al crear item. Vuelve a intentarlo.");
        });
        
    }

    function hide(){
        props.onHide();
        successAlert();
        setTimeout(() => {
            window.location.reload();
        }, 3600);
        //alert("Item creado exitosamente en la base de datos.");
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
                    Nuevo item
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <form>
                <div className='form-fields'>
                    <div className='input-container'>
                        <span className="input-span">Nombre</span>
                        <input className="input-field" type="text" placeholder="Ingresar..." value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                </div>
                <div className='form-fields'>
                    <div className='input-container'>
                        <span className="input-span">Costo</span>
                        <input className="input-field" type="number" placeholder="Ingresar..." value={cost} onChange={(e) => setCost(e.target.value)} required />
                    </div>
                </div>
                <div className='form-fields'>
                    <div className='input-container'>
                        <span className="input-span">Divisa</span>
                        <select className="input-field"  value={currencyId} onChange={(e) => setCurrency(e.target.value)} required>
                            <option value="" disabled hidden className="options">Seleccionar...</option> 
                            {currencies.map((item, i) => {
                                return <option className="options" key={i} value={item.id}>{item.currency_name}</option>
                            })};
                        </select>
                    </div>
                </div>
                <div className='form-fields'>
                    <div className='input-container'>
                        <span className="input-span">Unidad</span>
                        <select className="input-field"  value={unitId} onChange={(e) => setUnit(e.target.value)} required>
                            <option value="" disabled hidden className="options">Seleccionar...</option> 
                            {units.map((item, i) => {
                                return <option className="options" key={i} value={item.id}>{item.unit_name}</option>
                            })};
                        </select>
                    </div>
                </div>
                <div id="description-field" className='form-fields'>
                    <div className='input-container'>
                        <span className="input-span">Descripción</span>
                        <input className="input-field" type="text" placeholder="Ingresar..." value={description} onChange={(e) => setDescription(e.target.value)} required />
                    </div>
                </div>
            </form>
            </Modal.Body>
            <Modal.Footer>
                <button className='save-modal-button' onClick={() => {createItem(); hide()}}>Guardar</button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalI;