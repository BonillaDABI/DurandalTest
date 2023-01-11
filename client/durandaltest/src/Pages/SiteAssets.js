import React, { useState } from "react";

import { toast } from "react-toastify";
import axios from "axios";

import "../SCSS/Pages/_siteassets.scss"
import Datatable from "../Components/Datatable/DatatableSiteA";

function SiteAssets() {
  const successAlert = () => {
    toast.success("Sitio actualizado exitosamente en la base de datos.", {
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
    toast.error("Error al actualizar sitio. Vuelve a intentarlo.", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,

    });
  }

  var countries = JSON.parse(localStorage.getItem("countries"));
  var states = JSON.parse(localStorage.getItem("states"));
  var cities = JSON.parse(localStorage.getItem("cities"));
  var colonies = JSON.parse(localStorage.getItem("colonies"));

    const [name, setName] = useState("");
    const [addressStreet, setAddressStreet] = useState("");
    const [addressNumber, setAddressNumber] = useState("");
    // const [addressColonyId, setAddressColonyId] = useState("");
    // const [addressCityId, setAddressCityId] = useState("");
    // const [addressStateId, setAddressStateId] = useState("");
    // const [addressCountryId, setAddressCountryId] = useState("");
    const [addressPC, setAddressPC] = useState("");

  function updateSite() {
    var updateSiteId = localStorage.getItem("siteIdForUpdate");

        axios.patch(`http://localhost:3001/updateSite/${updateSiteId}`, { // url to POST
            'Authorization': "bearer " + localStorage.getItem('token'),
            name: name,
            address_street: addressStreet,
            address_number: addressNumber,
            // address_colony_id: addressColonyId,
            // address_city_id: addressCityId,
            // address_state_id: addressStateId,
            // address_country_id: addressCountryId,
            address_postal_code: addressPC
        })
        .then((response) => {
                // console.log(response);
        }, (error) => {
          console.log(error);
          errorAlert();
          //alert("Error al crear asset. Vuelve a intentarlo.");
        });
  }
  var business_name = localStorage.getItem("business_name");
  var siteNameForUPlaceholder = localStorage.getItem("siteNameForUPlaceholder")
  var siteANumberForUPlaceholder = localStorage.getItem("siteANumberForUPlaceholder")
  var siteAPCForUPlaceholder = localStorage.getItem("siteAPCForUPlaceholder")
  var siteAStreetForUPlaceholder = localStorage.getItem("siteAStreetForUPlaceholder")

  return (
    <div className="sitea-container">
      <h1 className="site-title">Actualizar sitio</h1>

        <div className="site-form-container">

          <form id="site-form-id">

            <div className='form-fields' id='large-form-field'>
              <div className='input-container'>
                <span className="input-span">Nombre del negocio</span>
                <input className="input-field" type="text" placeholder={business_name} disabled />
              </div>
            </div>

            <div className="site-form-column">

              <div className='form-fields' id='sa-form-field'>
                <div className='input-container'>
                  <span className="input-span">Nombre del sitio</span>
                  <input className="input-field" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder={siteNameForUPlaceholder} required />
                </div>
              </div>
              <div className='form-fields' id='sa-form-field'>
                <div className='input-container'>
                  <span className="input-span">Nombre de la calle</span>
                  <input className="input-field" type="text" value={addressStreet} onChange={(e) => setAddressStreet(e.target.value)} placeholder={siteAStreetForUPlaceholder} required />
                </div>
              </div>

            </div>

            <div className="site-form-column">

              <div className='form-fields' id='sa-form-field'>
                <div className='input-container'>
                  <span className="input-span">Número de dirección</span>
                  <input className="input-field" type="number" value={addressNumber} onChange={(e) => setAddressNumber(e.target.value)} placeholder={siteANumberForUPlaceholder} required />
                </div>
              </div>
              <div className='form-fields' id='sa-form-field'>
                <div className='input-container'>
                  <span className="input-span">Código postal</span>
                  <input className="input-field" type="number" value={addressPC} onChange={(e) => setAddressPC(e.target.value)} placeholder={siteAPCForUPlaceholder} required />
                </div>
              </div>

            </div>
          </form>
        </div>
        
        <div className="button-container">
          <button type="button" onClick={() => { updateSite() }} className="save-button" form="site-form-id">Actualizar cambios</button>
        </div>
        
        <div className="divider"></div>

        <div className="assets-container">
          <Datatable />
        </div>
      
    </div>
  );
}

export default SiteAssets;