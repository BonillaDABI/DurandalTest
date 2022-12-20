import axios from 'axios';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "../../SCSS/Components/_modal.scss"

function ModalA(props) {
    const successAlert = () => {
        toast.success("Asset creado exitosamente en la base de datos.", {
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
        toast.error("Error al crear asset. Vuelve a intentarlo.", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
    
        });
      }
    
      axios.get("http://localhost:3001/autofillAssets", {
    })
    .then((response) => {
      console.log(response.data)
    const assetInfo = JSON.stringify(response.data);

    console.log(assetInfo);
    localStorage.setItem("assets", assetInfo)
  })

  var assets = JSON.parse(localStorage.getItem("assets"));

  
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [siteId, setSiteId] = useState("");
    const [equipmentId, setEquipmentId] = useState("");
    const [assActiveStatus, setAssetAS] = useState("");


    function createAsset () {
        axios.post('http://localhost:3001/createAsset', { // url to POST
            'Authorization': "bearer " + localStorage.getItem('token'),
            name: name,
            description: description,
            site_id: siteId,
            equipment_id: equipmentId,
            asset_active_status_id: assActiveStatus
        })
        .then((response) => {
            console.log(response);
        }, (error) => {
            console.log(error);
            errorAlert();
            //alert("Error al crear asset. Vuelve a intentarlo.");
        });
        
    }

    function hide(){
        props.onHide();
        successAlert();
        setTimeout(() => {
            window.location.reload();
        }, 3600);
        //alert("Asset creado exitosamente en la base de datos.");
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
                    Nuevo asset
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
                        <span className="input-span">Estatus activo</span>
                        <select className="input-field"  value={assActiveStatus} onChange={(e) => setAssetAS(e.target.value)} required>
                            <option value="" disabled hidden className="options">Seleccionar...</option> 
                            {assets.statuses.map((item, i) => {
                                return <option className="options" key={i} value={item.id}>{item.aas_name}</option>
                            })};
                        </select>
                    </div>
                </div>
                <div className='form-fields'>
                    <div className='input-container'>
                        <span className="input-span">Sitio</span>
                        <select className="input-field"  value={siteId} onChange={(e) => setSiteId(e.target.value)} required>
                            <option value="" disabled hidden className="options">Seleccionar...</option> 
                            {assets.sites.map((item, i) => {
                                return <option className="options" key={i} value={item.id}>{item.site_name}</option>
                            })};
                        </select>
                    </div>
                </div>
                <div className='form-fields'>
                    <div className='input-container'>
                        <span className="input-span">Equipo</span>
                        <select className="input-field"  value={equipmentId} onChange={(e) => setEquipmentId(e.target.value)} required>
                            <option value="" disabled hidden className="options">Seleccionar...</option> 
                            {assets.equips.map((item, i) => {
                                return <option className="options" key={i} value={item.id}>{item.equip_name}</option>
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
                <button className='save-modal-button' onClick={() => {createAsset(); hide()}}>Guardar</button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalA;