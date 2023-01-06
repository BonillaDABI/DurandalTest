import React, { useEffect, useState } from "react";

import NewSidebar from "../Components/ProSidebar/ProSidebar";
import Navbar from "../Components/Navbar/Navbar";
import Datatable from "../Components/Datatable/DatatableELogs";

import "../SCSS/Elements/_tables.scss"


function EquipLogs() {    
  return (
    <div className="list">
      <NewSidebar />
        <div className="listContainer">
            <Navbar />
            <Datatable />
        </div>
    </div>
  );
}

export default EquipLogs;

