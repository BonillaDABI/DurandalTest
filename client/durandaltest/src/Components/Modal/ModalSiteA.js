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

    // const [name, setName] = useState("");
    // const [dimensiones, setDimensiones] = useState("");
    // const [description, setDescription] = useState("");
    // const [value, setValor] = useState("");

    function createSiteAsset() {

        // axios.post('http://localhost:3001/createEqAttr', { // url to POST
        //     'Authorization': "bearer " + localStorage.getItem('token'),
        //     name: name,
        //     dimensiones: dimensiones,
        //     description: description,
        //     equipment_id: localStorage.getItem('equipIdForAtt'),
        //     value: value
        // })
        //     .then((response) => {
        //         // console.log(response);
        //         hide();
        //     }, (error) => {
        //         console.log(error);
        //         errorAlert();
        //         //alert("Error al crear atributo. Vuelve a intentarlo.");
        //     });

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

    // axios.get("http://localhost:3001/autofillAssets", {
    // })
    //     .then((response) => {
    //         const assetInfo = JSON.stringify(response.data);
    //         //console.log(assetInfo);
    //         localStorage.setItem("assets", assetInfo)
    //     })

    // var assets = JSON.parse(localStorage.getItem("assets"));
    // console.log(attributes)

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