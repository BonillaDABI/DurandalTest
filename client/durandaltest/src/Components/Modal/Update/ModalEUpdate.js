import axios from 'axios';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import "../../../SCSS/Components/_modal.scss"

function ModalEUpdate(props) {
    const successAlert = () => {
        toast.success("Equipo actualizado exitosamente en la base de datos.", {
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
        toast.error("Error al actualizar equipo. Vuelve a intentarlo.", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,

        });
    }

    axios.get("http://localhost:3001/autofillBrands", {
    })
        .then((response) => {
            const brandInfo = JSON.stringify(response.data);
            //console.log(brandInfo);
            localStorage.setItem("brands", brandInfo)
        })

    var brands = JSON.parse(localStorage.getItem("brands"));

    const [name, setName] = useState("");
    const [brandId, setBrand] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("");

    function updateEquip() {
        var updateEquipId = localStorage.getItem("equipIdForUpdate");
        axios.patch(`http://localhost:3001/updateEquip/${updateEquipId}`, { // url to POST
            'Authorization': "bearer " + localStorage.getItem('token'),
            //user_name: userName,
            equip_name: name,
            description: description,
            brand_id: brandId,
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

    function hide() {
        props.onHide();
        successAlert();
        setTimeout(() => {
            window.location.reload();
        }, 3600);
    }

    var equipNameForUPlaceholder = localStorage.getItem("equipNameForUPlaceholder")
    var equipStatusForUPlaceholder = localStorage.getItem("equipStatusForUPlaceholder")
    var equipBrandForUPlaceholder = localStorage.getItem("equipBrandForUPlaceholder")
    var equipDescriptionForUPlaceholder = localStorage.getItem("equipDescriptionForUPlaceholder")

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Editar equipo
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className='form-fields'>
                        <div className='input-container'>
                            <span className="input-span">Nombre</span>
                            <input className="input-field" type="text" placeholder={equipNameForUPlaceholder} value={name} onChange={(e) => setName(e.target.value)} required />
                        </div>
                    </div>
                    <div className='form-fields'>
                        <div className='input-container'>
                            <span className="input-span">Estatus</span>
                            <select className="input-field" value={status} onChange={(e) => setStatus(e.target.value)} required>
                                <option value="" disabled hidden className="options">{equipStatusForUPlaceholder}</option>
                                <option value="1" className="options">Activo</option>
                                <option value="0" className="options">Inactivo</option>
                            </select>
                        </div>
                    </div>
                    <div className='form-fields' id='large-form-field'>
                        <div className='input-container'>
                            <span className="input-span">Marca</span>
                            <select className="input-field" value={brandId} onChange={(e) => setBrand(e.target.value)} required>
                                <option value="" disabled hidden className="options">{equipBrandForUPlaceholder}</option>
                                {brands.map((item, i) => {
                                    return <option className="options" key={i} value={item.id}>{item.brand_name}</option>
                                })};
                            </select>
                        </div>
                    </div>
                    <div id="description-field" className='form-fields'>
                        <div className='input-container'>
                            <span className="input-span">Descripción</span>
                            <input className="input-field" type="text" placeholder={equipDescriptionForUPlaceholder} value={description} onChange={(e) => setDescription(e.target.value)} required />
                        </div>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <button className='update-modal-button' onClick={() => { hide(); updateEquip() }}>Guardar cambios</button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalEUpdate;