import React, { useEffect, useState } from "react";

import DatatableC from "../Components/Datatable/DatatableClientC";
import DatatableS from "../Components/Datatable/DatatableS";


import "../SCSS/Elements/_tables.scss"

import { Box, Tab, Tabs } from '@mui/material';
import axios from "axios";
import ClientBreadcrumbs from "../Components/ClientBreadcrumbs";


function ClientInfo() {    
  const [tabIndex, setTabIndex] = useState(0);
  const [business, setBusiness] = useState("");
  const [rfc, setRFC] = useState("");
  const [taxId, setTaxId] = useState("");

  var clients = JSON.parse(localStorage.getItem("clients"));

  function updateClient() {
    var updateClientId = localStorage.getItem("client_id");
    axios.patch(`http://localhost:3001/updateClient/${updateClientId}`, { // url to POST
      'Authorization': "bearer " + localStorage.getItem('token'),
      //user_name: userName,
      business_name: business,
      rfc: rfc,
      tax_id: taxId
    },)
      .then((response) => {
        console.log(response);
        alert("Cliente actualizado exitosamente en la base de datos.");
        localStorage.setItem("business_name", business);
        localStorage.setItem("client_rfc", rfc);
        localStorage.setItem("client_tax_id", taxId);
        window.location.reload();
      }, (error) => {
        console.log(error);
        alert("Error al actualizar datos del cliente. Vuelve a intentarlo.");
      });
  }
 
  const handleTabChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };

  var businessName = localStorage.getItem("business_name");
  var clientRFC = localStorage.getItem("client_rfc");
  var clientTax = localStorage.getItem("client_tax_id");

  //console.log(clientTax);
  return (
    <div className="list">
      <div className="listContainer">
        <br />
        <ClientBreadcrumbs />
        <br />
        <form className="update-client-form">
          <div className='form-fields' id="large-form-field">
            <div className='mini-input-container'>
              <span className="input-span">Nombre del negocio</span>
              <input className="input-field" type="text" placeholder={businessName} value={business} onChange={(e) => setBusiness(e.target.value)} required />
            </div>
          </div>
          <div className='form-fields'>
            <div className='mini-input-container'>
              <span className="input-span">RFC</span>
              <input className="input-field" type="text" placeholder={clientRFC} value={rfc} onChange={(e) => setRFC(e.target.value)} required />
            </div>
          </div>
          <div className='form-fields'>
            <div className='mini-input-container'>
              <span className="input-span">Tax ID</span>
              <select className="input-field"  value={taxId} onChange={(e) => setTaxId(e.target.value)} required>
                <option value={clientTax} disabled hidden className="options">{clientTax}</option> 
                {clients.activeTaxes.map((item, i) => {
                  return <option className="options" key={i} value={item.id}>{item.name}</option>
                })};
              </select>
            </div>
          </div>        
        </form>
        <br />
        <div className="ci-button-container">
          <button className='save-button' onClick={() => {updateClient();}}>Guardar cambios</button>
        </div>
        <div className='divider'></div>
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
              <Tab label="Contactos"></Tab>
              <Tab label="Sitios"></Tab>
            </Tabs>
          </Box>
          <Box sx={{ padding: 2 }}>
          {tabIndex === 0 && (
            <Box>
              <DatatableC />
            </Box>
          )}
          {tabIndex === 1 && (
            <Box>
              <DatatableS />
            </Box>
          )}
          </Box>
        </Box>
      </div>
    </div>
  );
}

export default ClientInfo;

