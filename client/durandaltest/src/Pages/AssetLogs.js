import React, { useEffect, useState } from "react";

import Sidebar from "../Components/Sidebar/Sidebar";
import Navbar from "../Components/Navbar/Navbar";
import Datatable from "../Components/Datatable/DatatableALogs";

import "../SCSS/Elements/_tables.scss"


function AssetLogs() {    
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

export default AssetLogs;

