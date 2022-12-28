import axios from 'axios';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import "../../../SCSS/Components/_modal.scss"

function ModalAUpdate(props) {
    const successAlert = () => {
        toast.success("Asset actualizado exitosamente en la base de datos.", {
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
        toast.error("Error al actualizar asset. Vuelve a intentarlo.", {
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
    const [status, setStatus] = useState("");

    function updateAsset(){
        var updateAssetId = localStorage.getItem("assetIdForUpdate");
        axios.patch(`http://localhost:3001/updateAsset/${updateAssetId}`, { // url to POST
        'Authorization': "bearer " + localStorage.getItem('token'),
        //user_name: userName,
            asset_name: name,
            description: description,
            site_id: siteId,
            equipment_id: equipmentId,
            is_active: status,
            asset_active_status_id: assActiveStatus
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

    var assetNameForUPlaceholder = localStorage.getItem("assetNameForUPlaceholder")
    var assetStatusForUPlaceholder = localStorage.getItem("assetStatusForUPlaceholder")
    var assetAASForUPlaceholder = localStorage.getItem("assetAASForUPlaceholder")
    var assetSiteForUPlaceholder = localStorage.getItem("assetSiteForUPlaceholder")
    var assetDescriptionForUPlaceholder = localStorage.getItem("assetDescriptionForUPlaceholder")
    var assetClientForUPlaceholder = localStorage.getItem("assetClientForUPlaceholder")

    return (
        <Modal 
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Editar asset
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <form>
                <div className='form-fields'>
                    <div className='input-container'>
                        <span className="input-span">Nombre</span>
                        <input className="input-field" type="text" placeholder={assetNameForUPlaceholder} value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                </div>
                <div className='form-fields'>
                    <div className='input-container'>
                        <span className="input-span">Estatus</span>
                        <select className="input-field" value={status} onChange={(e) => setStatus(e.target.value)} required>
                            <option value="" disabled hidden className="options">{assetStatusForUPlaceholder}</option> 
                            <option value="1" className="options">Activo</option>
                            <option value="0" className="options">Inactivo</option>
                        </select>
                    </div>
                </div>
                <div className='form-fields' id='large-form-field'>
                    <div className='input-container'>
                        <span className="input-span">Estatus activo</span>
                        <select className="input-field"  value={assActiveStatus} onChange={(e) => setAssetAS(e.target.value)} required>
                            <option value="" disabled hidden className="options">{assetAASForUPlaceholder}</option> 
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
                            <option value="" disabled hidden className="options">{assetSiteForUPlaceholder}</option> 
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
                        <input className="input-field" type="text" placeholder={assetDescriptionForUPlaceholder} value={description} onChange={(e) => setDescription(e.target.value)} required />
                    </div>
                </div>
            </form>
            </Modal.Body>
            <Modal.Footer>
                <button className='update-modal-button' onClick={() => {hide(); updateAsset()}}>Guardar cambios</button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalAUpdate;