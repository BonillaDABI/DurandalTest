import React, { useEffect, useState } from "react";

import Datatable from "../Components/Datatable/DatatableELogs";

import "../SCSS/Elements/_tables.scss"


function EquipLogs() {    
  return (
    <div className="list">
        <div className="listContainer">
            <Datatable />
        </div>
    </div>
  );
}

export default EquipLogs;

