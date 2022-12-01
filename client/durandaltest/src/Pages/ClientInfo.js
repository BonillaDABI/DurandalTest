import React, { useEffect, useState } from "react";

import Sidebar from "../Components/Sidebar/Sidebar";
import Navbar from "../Components/Navbar/Navbar";
import DatatableC from "../Components/Datatable/DatatableClientC";
import DatatableS from "../Components/Datatable/DatatableS";


import "../SCSS/Elements/_tables.scss"

import { Box, Tab, Tabs } from '@mui/material';
import axios from "axios";


function ClientInfo() {    
  const [tabIndex, setTabIndex] = useState(0);
 
  const handleTabChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };

  var businessName = localStorage.getItem("business_name");
  var clientRFC = localStorage.getItem("client_rfc");
  var clientTax = localStorage.getItem("client_tax_id");

  //console.log(clientTax);
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <span><strong>{businessName}</strong></span><br />
        <span>{clientRFC}</span><br />
        <span>{clientTax}</span>
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

