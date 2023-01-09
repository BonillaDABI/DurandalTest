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

  function updateSite() {

  }

  return (
    <div className="list">
      <div className="listContainer">
        <div className="site-form-container">
          <h1 className="site-title">Actualizar sitio</h1>
          <form id="site-form-id">

            <div className="row">
              <div className='form-fields column'>
                <div className='input-container'>
                  <span className="input-span">Nombre</span>
                  <input className="input-field" type="text" placeholder="Ingresar..." required />
                </div>
              </div>
              <div className='form-fields column'>
                <div className='input-container'>
                  <span className="input-span">Marca</span>
                  <input className="input-field" type="text" placeholder="Ingresar..." required />
                </div>
              </div>
            </div>

            <div id='description-field' className='form-fields'>
              <div className='input-container'>
                <span className="input-span">Descripción</span>
                <input className="input-field" type="text" placeholder="Ingresar..." required />
              </div>
            </div>
          </form>
          <div className="button-container">
            <button type="button" onClick={() => { updateSite() }} className="save-button" form="site-form-id">Actualizar cambios</button>
          </div>
        </div>

        <div className="divider"></div>

        <div className="assets-container">
          <Datatable />
        </div>
      </div>
    </div>
  );
}

export default SiteAssets;