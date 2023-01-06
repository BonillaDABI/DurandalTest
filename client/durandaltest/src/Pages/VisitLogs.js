import React, { useEffect, useState } from "react";

import NewSidebar from "../Components/ProSidebar/ProSidebar";
import Navbar from "../Components/Navbar/Navbar";
import Datatable from "../Components/Datatable/DatatableVLogs";

import "../SCSS/Elements/_tables.scss"


function VisitLogs() {    
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

export default VisitLogs;

