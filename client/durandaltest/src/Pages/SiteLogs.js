import React, { useEffect, useState } from "react";

import Sidebar from "../Components/Sidebar/Sidebar";
import Navbar from "../Components/Navbar/Navbar";
import Datatable from "../Components/Datatable/DatatableSLogs";

import "../SCSS/Elements/_tables.scss"


function SiteLogs() {    
  return (
    <div className="list">
      <Sidebar />
        <div className="listContainer">
            <Navbar />
            <Datatable />
        </div>
    </div>
  );
}

export default SiteLogs;

