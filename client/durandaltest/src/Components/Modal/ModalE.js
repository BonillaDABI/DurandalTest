import axios from 'axios';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "../../SCSS/Components/_modal.scss"

function ModalE(props) {
    const successAlert = () => {
        toast.success("Equipo creado exitosamente en la base de datos.", {
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
        toast.error("Error al crear equipo. Vuelve a intentarlo.", {
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
        console.log(brandInfo);
        localStorage.setItem("brands", brandInfo)
    })
    
    var brands = JSON.parse(localStorage.getItem("brands"));
    
    const [name, setName] = useState("");
    const [brandId, setBrand] = useState("");
    const [description, setDescription] = useState("");


    function createEquip () {
        
        axios.post('http://localhost:3001/createEquip', { // url to POST
            'Authorization': "bearer " + localStorage.getItem('token'),
            name: name,
            brand_id: brandId,
            description: description
        })
        .then((response) => {
            console.log(response);
        }, (error) => {
            console.log(error);
            errorAlert();
            //alert("Error al crear equipo. Vuelve a intentarlo.");
        });
        
    }

    function hide(){
        props.onHide();
        successAlert();
        setTimeout(() => {
            window.location.reload();
        }, 3600);
        //alert("Equipo creado exitosamente en la base de datos.");
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
                    Nuevo equipo
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
                        <span className="input-span">Marca</span>
                        <select className="input-field"  value={brandId} onChange={(e) => setBrand(e.target.value)} required>
                            {brands.map((item, i) => {
                                return <option className="options" key={i} value={item.id}>{item.brand_name}</option>
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
                <button className='save-modal-button' onClick={() => {createEquip(); hide()}}>Guardar</button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalE;