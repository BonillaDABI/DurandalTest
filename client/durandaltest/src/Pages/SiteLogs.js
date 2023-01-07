import React, { useEffect, useState } from "react";

import Datatable from "../Components/Datatable/DatatableSLogs";

import "../SCSS/Elements/_tables.scss"


function SiteLogs() {    
  return (
    <div className="list">
        <div className="listContainer">
            <Datatable />
        </div>
    </div>
  );
}

export default SiteLogs;

