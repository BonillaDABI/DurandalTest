import axios from 'axios';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import "../../../SCSS/Components/_modal.scss"

function ModalIUpdate(props) {
    const successAlert = () => {
        toast.success("Item actualizado exitosamente en la base de datos.", {
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
        toast.error("Error al actualizar item. Vuelve a intentarlo.", {
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
    const [status, setStatus] = useState("");

    function updateItem(){
        var updateItemId = localStorage.getItem("itemIdToUpdate");
        axios.patch(`http://localhost:3001/updateItem/${updateItemId}`, { // url to POST
            'Authorization': "bearer " + localStorage.getItem('token'),
            //user_name: userName,
            name: name,
            description: description,
            cost: cost,
            currency_id: currencyId,
            unit_id: unitId,
            is_active: status
        },)
            .then((response) => {
                console.log(response);
                //alert("Cliente actualizado exitosamente en la base de datos.");
                window.location.reload();
            }, (error) => {
                console.log(error);
                //alert("Error al actualizar datos del cliente. Vuelve a intentarlo.");
            });
    }

    function hide(){
        props.onHide();
        successAlert();
        setTimeout(() => {
            window.location.reload();
        }, 3600);
    }

    var itemNameForUPlaceholder = localStorage.getItem("itemNameForUPlaceholder")
    var itemStatusForUPlaceholder = localStorage.getItem("itemStatusForUPlaceholder")
    var itemCostForUPlaceholder = localStorage.getItem("itemCostForUPlaceholder")
    var itemCurrencyForUPlaceholder = localStorage.getItem("itemCurrencyForUPlaceholder")
    var itemUnitForUPlaceholder = localStorage.getItem("itemUnitForUPlaceholder")
    var itemDescriptionForUPlaceholder = localStorage.getItem("itemDescriptionForUPlaceholder")

    return (
        <Modal 
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Editar item
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <form>
                <div className='form-fields'>
                    <div className='input-container'>
                        <span className="input-span">Nombre</span>
                        <input className="input-field" type="text" placeholder={itemNameForUPlaceholder} value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                </div>
                <div className='form-fields'>
                    <div className='input-container'>
                        <span className="input-span">Estatus</span>
                        <select className="input-field" value={status} onChange={(e) => setStatus(e.target.value)} required>
                            <option value="" disabled hidden className="options">{itemStatusForUPlaceholder}</option>
                            <option value="1" className="options">Activo</option>
                            <option value="0" className="options">Inactivo</option>
                        </select>
                    </div>
                </div>
                <div className='form-fields'>
                    <div className='input-container'>
                        <span className="input-span">Costo</span>
                        <input className="input-field" type="number" placeholder={itemCostForUPlaceholder} value={cost} onChange={(e) => setCost(e.target.value)} required />
                    </div>
                </div>
                <div className='form-fields'>
                    <div className='input-container'>
                        <span className="input-span">Divisa</span>
                        <select className="input-field"  value={currencyId} onChange={(e) => setCurrency(e.target.value)} required>
                            <option value="" disabled hidden className="options">{itemCurrencyForUPlaceholder}</option> 
                            {currencies.map((item, i) => {
                                return <option className="options" key={i} value={item.id}>{item.currency_name}</option>
                            })};
                        </select>
                    </div>
                </div>
                <div className='form-fields' id='large-form-field'>
                    <div className='input-container'>
                        <span className="input-span">Unidad</span>
                        <select className="input-field"  value={unitId} onChange={(e) => setUnit(e.target.value)} required>
                            <option value="" disabled hidden className="options">{itemUnitForUPlaceholder}</option> 
                            {units.map((item, i) => {
                                return <option className="options" key={i} value={item.id}>{item.unit_name}</option>
                            })};
                        </select>
                    </div>
                </div>
                <div id="description-field" className='form-fields'>
                    <div className='input-container'>
                        <span className="input-span">Descripci??n</span>
                        <input className="input-field" type="text" placeholder={itemDescriptionForUPlaceholder} value={description} onChange={(e) => setDescription(e.target.value)} required />
                    </div>
                </div>
            </form>
            </Modal.Body>
            <Modal.Footer>
                <button className='update-modal-button' onClick={() => {hide(); updateItem()}}>Guardar cambios</button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalIUpdate;