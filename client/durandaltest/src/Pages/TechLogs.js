import React, { useEffect, useState } from "react";

import Sidebar from "../Components/Sidebar/Sidebar";
import Navbar from "../Components/Navbar/Navbar";
import Datatable from "../Components/Datatable/DatatableTLogs";

import "../SCSS/Elements/_tables.scss"
import TechBreadcrumbs from "../Components/TechBreadcrumbs";


function TechLogs() {    
  return (
    <div className="list">
      <Sidebar />
        <div className="listContainer">
            <Navbar />
            <br />
            <TechBreadcrumbs />
            <Datatable />
        </div>
    </div>
  );
}

export default TechLogs;

