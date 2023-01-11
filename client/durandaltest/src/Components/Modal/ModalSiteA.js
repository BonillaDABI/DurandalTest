import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Tab, Tabs } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "../../SCSS/Components/_modal.scss"

function ModalSiteA(props) {
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

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [siteId, setSiteId] = useState("");
    const [equipmentId, setEquipmentId] = useState("");
    const [assActiveStatus, setAssetAS] = useState("");

    function createSiteAsset() {

        axios.post('http://localhost:3001/createEqAttr', { // url to POST
            'Authorization': "bearer " + localStorage.getItem('token'),
            asset_name: name,
            description: description,
            site_id: siteId,
            equipment_id: equipmentId,
            asset_active_status_id: assActiveStatus
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

    function asignSiteAsset() {

    }

    function hide() {
        props.onHide();
        successAlert();
        // setTimeout(() => {
        //     window.location.reload();
        // }, 3600);
        //alert("Asset creado exitosamente en la base de datos.");
    }

    axios.get("http://localhost:3001/autofillAssets", {
    })
        .then((response) => {
            const assetInfo = JSON.stringify(response.data);
            //console.log(assetInfo);
            localStorage.setItem("assets", assetInfo)
        })

    var assets = JSON.parse(localStorage.getItem("assets"));

    const [tabIndex, setTabIndex] = useState(0);

    const handleTabChange = (event, newTabIndex) => {
        setTabIndex(newTabIndex);
    };

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
                    Asignar asset
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Box>
                    <Box>
                        <Tabs
                            value={tabIndex}
                            onChange={handleTabChange}
                            textColor="inherit"
                            variant="fullWidth"
                            TabIndicatorProps={{ sx: { backgroundColor: '#4a4a4a' } }}
                            sx={{
                                "& button": { color: '#4a4a4a' },
                                "& button:active": { color: '#dc1f0f' },
                                "& button:Mui-selected": { color: '#dc1f0f' }
                            }}
                        >
                            <Tab label="Asset existente"></Tab>
                            <Tab label="Nuevo asset"></Tab>
                        </Tabs>
                    </Box>
                    {tabIndex === 0 && (
                        <Box>
                            <form className='asign-asset-form'>
                                
                            </form>
                            <Modal.Footer>
                                <button type="button" form='asign-asset-form' className='save-modal-button' onClick={() => { asignSiteAsset() }}>Asignar</button>
                            </Modal.Footer>
                        </Box>
                    )}
                    {tabIndex === 1 && (
                        <Box>
                            <form className='create-asset-form'>
                                <div id='large-form-field' className='form-fields'>
                                    <div className='input-container'>
                                        <span className="input-span">Cliente</span>
                                        <input className="input-field" type="text" disabled placeholder="Ingresar..." required />
                                    </div>
                                </div>
                                <div id='large-form-field' className='form-fields'>
                                    <div className='input-container'>
                                        <span className="input-span">Sitio</span>
                                        <input className="input-field" type="text" disabled placeholder="Ingresar..." required />
                                    </div>
                                </div>
                                <div className="form-divider"></div>
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
                                <div id='large-form-field' className='form-fields' style={{ alignItems: 'center' }}>
                                    <div className='input-container'>
                                        <span className="input-span">Equipo</span>
                                        <select className="input-field"  value={equipmentId} onChange={(e) => setEquipmentId(e.target.value)} required>
                                            <option value="" disabled hidden className="options">Seleccionar...</option> 
                                            {assets.equips.map((item, i) => {
                                                return <option className="options" key={i} value={item.id}>{item.equip_name}</option>
                                            })};
                                        </select>
                                    </div>
                                    <button style={{ height: '100%', width: '50px', background: "none", border: "none", marginTop: '10px'}}><FontAwesomeIcon icon={faCirclePlus} className="create-equip-icon"/></button>
                                </div>
                                <div id="description-field" className='form-fields'>
                                    <div className='input-container'>
                                        <span className="input-span">Descripción</span>
                                        <input className="input-field" type="text" placeholder="Ingresar..." value={description} onChange={(e) => setDescription(e.target.value)} required />
                                    </div>
                                </div>
                            </form>
                            <Modal.Footer>
                                <button type="button" form='create-asset-form' className='save-modal-button' onClick={() => { createSiteAsset() }}>Guardar</button>
                            </Modal.Footer>
                        </Box>
                    )}
                </Box>
            </Modal.Body>
        </Modal>
    );
};

export default ModalSiteA;