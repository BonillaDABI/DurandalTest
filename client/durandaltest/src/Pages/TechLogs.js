import React, { useEffect, useState } from "react";

import Datatable from "../Components/Datatable/DatatableTLogs";

import "../SCSS/Elements/_tables.scss"
import TechBreadcrumbs from "../Components/TechBreadcrumbs";


function TechLogs() {    
  return (
    <div className="list">
        <div className="listContainer">
            <TechBreadcrumbs />
            <Datatable />
        </div>
    </div>
  );
}

export default TechLogs;

