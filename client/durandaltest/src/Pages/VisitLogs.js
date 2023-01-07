import React, { useEffect, useState } from "react";

import Datatable from "../Components/Datatable/DatatableVLogs";

import "../SCSS/Elements/_tables.scss"


function VisitLogs() {    
  return (
    <div className="list">
        <div className="listContainer">
            <Datatable />
        </div>
    </div>
  );
}

export default VisitLogs;

