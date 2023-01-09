import axios from 'axios';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import "../../../SCSS/Components/_modal.scss"

function ModalSiteAUpdate(props) {
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

    // const [name, setName] = useState("");
    // const [description, setDescription] = useState("");
    // const [cost, setCost] = useState("");
    // const [unitId, setUnit] = useState("");
    // const [currencyId, setCurrency] = useState("");
    // const [status, setStatus] = useState("");

    function updateAsset(){
        // var updateAttId = localStorage.getItem("itemIdToUpdate");
        // axios.patch(`http://localhost:3001/updateItem/${updateItemId}`, { // url to POST
        //     'Authorization': "bearer " + localStorage.getItem('token'),
        //     //user_name: userName,
        //     name: name,
        //     description: description,
        //     cost: cost,
        //     currency_id: currencyId,
        //     unit_id: unitId,
        //     is_active: status
        // },)
        //     .then((response) => {
        //         console.log(response);
        //         //alert("Cliente actualizado exitosamente en la base de datos.");
        //         window.location.reload();
        //     }, (error) => {
        //         console.log(error);
        //         //alert("Error al actualizar datos del cliente. Vuelve a intentarlo.");
        //     });
    }

    function hide(){
        props.onHide();
        successAlert();
        setTimeout(() => {
            window.location.reload();
        }, 3600);
    }

    // var itemNameForUPlaceholder = localStorage.getItem("itemNameForUPlaceholder")
    // var itemStatusForUPlaceholder = localStorage.getItem("itemStatusForUPlaceholder")
    // var itemCostForUPlaceholder = localStorage.getItem("itemCostForUPlaceholder")
    // var itemCurrencyForUPlaceholder = localStorage.getItem("itemCurrencyForUPlaceholder")
    // var itemUnitForUPlaceholder = localStorage.getItem("itemUnitForUPlaceholder")
    // var itemDescriptionForUPlaceholder = localStorage.getItem("itemDescriptionForUPlaceholder")

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
                
            </form>
            </Modal.Body>
            <Modal.Footer>
                <button className='update-modal-button' onClick={() => {hide(); updateAsset()}}>Guardar cambios</button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalSiteAUpdate;