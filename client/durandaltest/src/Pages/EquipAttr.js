import React, { useState } from "react";

import Sidebar from "../Components/Sidebar/Sidebar";
import Navbar from "../Components/Navbar/Navbar";
import { toast } from "react-toastify";
import axios from "axios";

import "../SCSS/Pages/_equipattr.scss"
import Datatable from "../Components/Datatable/DatatableEqAt";

function EquipAttr(){
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

  function createEquip(){
    axios.post('http://localhost:3001/createEquip', { // url to POST
            'Authorization': "bearer " + localStorage.getItem('token'),
            name: name,
            brand_id: brandId,
            description: description
        })
        .then((response) => {
            successAlert();
            // setTimeout(() => {
            //   window.location.reload();
            //   document.getElementById('add-attribute-btn').disabled = false;
            // }, 3600);
            console.log(response);
            //localStorage.setItem("equipIdForAtt", )
        }, (error) => {
            console.log(error);
            errorAlert();
            //alert("Error al crear equipo. Vuelve a intentarlo.");
        });
  }

    return (
        <div className="list">
        <Sidebar />
        <div className="listContainer">
          <Navbar />
          <div className="equip-form-container">
            <h1 className="equip-title">Nuevo equipo</h1>
            <form id="equip-form-id">

             <div className="row">
                <div className='form-fields column'>
                    <div className='input-container'>
                        <span className="input-span">Nombre</span>
                        <input className="input-field" type="text" placeholder="Ingresar..." value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                </div>
                <div className='form-fields column'>
                    <div className='input-container'>
                        <span className="input-span">Marca</span>
                        <select className="input-field"  value={brandId} onChange={(e) => setBrand(e.target.value)} required>
                            <option value="" disabled hidden className="options">Seleccionar...</option> 
                            {brands.map((item, i) => {
                                return <option className="options" key={i} value={item.id}>{item.brand_name}</option>
                            })};
                        </select>
                    </div>
                </div>
              </div> 

              <div id='description-field' className='form-fields'>
                  <div className='input-container'>
                      <span className="input-span">Descripción</span>
                      <input className="input-field" type="text" placeholder="Ingresar..." value={description} onChange={(e) => setDescription(e.target.value)} required />
                  </div>
              </div>
            </form>
            <div className="button-container">
              <button type="submit" onClick={() => {createEquip()}} className="save-button" form="equip-form-id">Guardar</button>
            </div>
          </div>

          <div className="divider"></div>

          <div className="attributes-container">
            <Datatable />
          </div>
        </div>
      </div>
    );
}

export default EquipAttr;