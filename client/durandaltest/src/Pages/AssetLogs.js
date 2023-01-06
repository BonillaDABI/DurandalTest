import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar/Navbar";
import Datatable from "../Components/Datatable/DatatableALogs";

import "../SCSS/Elements/_tables.scss"
import NewSidebar from "../Components/ProSidebar/ProSidebar";


function AssetLogs() {    
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

export default AssetLogs;

