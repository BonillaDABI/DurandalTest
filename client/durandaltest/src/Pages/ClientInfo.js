import React, { useState } from "react";

import Sidebar from "../Components/Sidebar/Sidebar";
import Navbar from "../Components/Navbar/Navbar";
import DatatableC from "../Components/Datatable/DatatableClientC";
import DatatableS from "../Components/Datatable/DatatableS";


import "../SCSS/Elements/_tables.scss"
import { Box, Tab, Tabs } from '@mui/material';



function ClientInfo() {
  var business_name = localStorage.getItem("business_name");
  var client_id = localStorage.getItem("client_id");
  var client_rfc = localStorage.getItem("client_rfc");
  var client_tax = localStorage.getItem("client_tax");


  const [tabIndex, setTabIndex] = useState(0);
 
  const handleTabChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <span><strong>{business_name}</strong></span><br />
        <span>{client_rfc}</span><br />
        <span>{client_tax}</span>
        <Box>
          <Box>
            <Tabs value={tabIndex} onChange={handleTabChange}>
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

