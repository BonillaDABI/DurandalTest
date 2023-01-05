import { Box, Tab, Tabs } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "../../SCSS/Components/_modal.scss"

function ModalEqAtt(props) {
    const successAlert = () => {
        toast.success("Atributo creado exitosamente en la base de datos.", {
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
        toast.error("Error al crear atributo. Vuelve a intentarlo.", {
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
    const [dimensiones, setDimensiones] = useState("");
    const [description, setDescription] = useState("");
    const [value, setValor] = useState("");

    function createEquipAtt() {
    
        axios.post('http://localhost:3001/createEqAttr', { // url to POST
            'Authorization': "bearer " + localStorage.getItem('token'),
            name: name,
            dimensiones: dimensiones,
            description: description,
            equipment_id: localStorage.getItem('equipID'),
            value: value
        })
            .then((response) => {
                console.log(response);
                hide();
            }, (error) => {
                console.log(error);
                errorAlert();
                //alert("Error al crear atributo. Vuelve a intentarlo.");
            });

    }

    function asignEquipAtt() {

    }

    function hide() {
        props.onHide();
        successAlert();
        setTimeout(() => {
            window.location.reload();
        }, 3600);
        //alert("Atributo creado exitosamente en la base de datos.");
    }

    axios.get("http://localhost:3001/autofillAttrs", {
    })
    .then((response) => {
        const attrInfo = JSON.stringify(response.data);
        //console.log(rolesInfo);
        localStorage.setItem("attributes", attrInfo)
        //console.log(localStorage.getItem("roles"));
    })
    
    var attributes = JSON.parse(localStorage.getItem("attributes"));
    console.log(attributes)

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
                    Asignar atributo
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
                        TabIndicatorProps={{sx: {backgroundColor: '#4a4a4a'}}} 
                        sx={{
                            "& button": {color: '#4a4a4a'},
                            "& button:active": {color: '#dc1f0f'},
                            "& button:Mui-selected": {color: '#dc1f0f'}
                        }}
                        >
                        <Tab label="Atributo existente"></Tab>
                        <Tab label="Nuevo atributo"></Tab>
                        </Tabs>
                    </Box>
                    {tabIndex === 0 && (
                        <Box>
                            <form className='asign-att-form'>
                                <div className='form-fields'>
                                    <div className='input-container'>
                                        <span className="input-span">Atributo</span>
                                        <select className="input-field"  required>
                                            <option value="" selected disabled hidden className="options">Seleccionar...</option> 
                                            {attributes.map((item, i) => {
                                                return <option className="options" key={i} value={item.id}>{item.name}</option>
                                            })};
                                        </select>
                                    </div>
                                </div>
                                <div className='form-fields'>
                                    <div className='input-container'>
                                        <span className="input-span">Valor</span>
                                        <input className="input-field" type="number" placeholder="Ingresar..." required />
                                    </div>
                                </div>
                            </form>
                            <Modal.Footer>
                                <button type='submit' form='asign-att-form' className='save-modal-button' onClick={() => { asignEquipAtt() }}>Asignar</button>
                            </Modal.Footer>
                        </Box>
                    )}
                    {tabIndex === 1 && (
                        <Box>
                            <form className='create-att-form'>
                                <div className='form-fields'>
                                    <div className='input-container'>
                                        <span className="input-span">Nombre</span>
                                        <input className="input-field" type="text" placeholder="Ingresar..." value={name} onChange={(e) => setName(e.target.value)} required />
                                    </div>
                                </div>
                                <div className='form-fields'>
                                    <div className='input-container'>
                                        <span className="input-span">Dimensiones</span>
                                        <input className="input-field" type="text" placeholder="Ingresar..." value={dimensiones} onChange={(e) => setDimensiones(e.target.value)} required />
                                    </div>
                                </div>
                                <div id='large-form-field' className='form-fields'>
                                    <div className='input-container'>
                                        <span className="input-span">Valor</span>
                                        <input className="input-field" type="text" placeholder="Ingresar..." value={value} onChange={(e) => setValor(e.target.value)} required />
                                    </div>
                                </div>
                                <div id="description-field" className='form-fields'>
                                    <div className='input-container'>
                                        <span className="input-span">Descripción</span>
                                        <input className="input-field" type="text" placeholder="Ingresar..." value={description} onChange={(e) => setDescription(e.target.value)} required />
                                    </div>
                                </div>
                            </form>
                            <Modal.Footer>
                                <button type='submit' form='create-att-form' className='save-modal-button' onClick={() => { createEquipAtt() }}>Guardar</button>
                            </Modal.Footer>
                        </Box>
                    )}
                </Box>
            </Modal.Body>
        </Modal>
    );
};

export default ModalEqAtt;