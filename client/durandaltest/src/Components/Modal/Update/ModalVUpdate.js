import axios from 'axios';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import "../../../SCSS/Components/_modal.scss"

function ModalVUpdate(props) {
    const successAlert = () => {
        toast.success("Visita actualizada exitosamente en la base de datos.", {
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
        toast.error("Error al actualizar visita. Vuelve a intentarlo.", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
    
        });
      }
    
        axios.get("http://localhost:3001/autofillVisits", {
        })
        .then((response) => {
        console.log(response.data)
        const visitsInfo = JSON.stringify(response.data);

        console.log(visitsInfo);
        localStorage.setItem("visits", visitsInfo)
    })

    var visits = JSON.parse(localStorage.getItem("visits"));

    const [visitTypeId, setVisitTypeId] = useState("");
    const [visitSiteId, setVisitSiteId] = useState("");
    const [visitTechId, setVisitTechId] = useState("");
    const [visitName, setVisitName] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("");

    function updateVisit(){
        
    }

    function hide(){
        props.onHide();
        successAlert();
        // setTimeout(() => {
        //     window.location.reload();
        // }, 3600);
    }

    return (
        <Modal 
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Editar visita
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <form>
                <div className='form-fields'>
                    <div className='input-container'>
                        <span className="input-span">Nombre de la visita</span>
                        <input className="input-field" type="text" placeholder="Ingresar..." value={visitName} onChange={(e) => setVisitName(e.target.value)} required />
                    </div>
                </div>
                <div className='form-fields'>
                    <div className='input-container'>
                        <span className="input-span">Técnico</span>
                        <select className="input-field"  value={visitTechId} onChange={(e) => setVisitTechId(e.target.value)} required>
                            <option value="" disabled hidden className="options">Seleccionar...</option> 
                            {visits.techs.map((item, i) => {
                                return <option className="options" key={i} value={item.id}>{item.name}&nbsp;{item.first_surname}&nbsp;{item.second_surname}</option>
                            })};
                        </select>
                    </div>
                </div>
                <div className='form-fields'>
                    <div className='input-container'>
                        <span className="input-span">Sitio de la visita</span>
                        <select className="input-field"  value={visitSiteId} onChange={(e) => setVisitSiteId(e.target.value)} required>
                            <option value="" disabled hidden className="options">Seleccionar...</option> 
                            {visits.sites.map((item, i) => {
                                return <option className="options" key={i} value={item.id}>{item.site_name}</option>
                            })};
                        </select>
                    </div>
                </div>
                <div className='form-fields'>
                    <div className='input-container'>
                        <span className="input-span">Tipo de visita</span>
                        <select className="input-field"  value={visitTypeId} onChange={(e) => setVisitTypeId(e.target.value)} required>
                            <option value="" disabled hidden className="options">Seleccionar...</option> 
                            {visits.visitTypes.map((item, i) => {
                                return <option className="options" key={i} value={item.id}>{item.vt_name}</option>
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
                <button className='update-modal-button' onClick={() => {hide(); updateVisit()}}>Guardar cambios</button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalVUpdate;