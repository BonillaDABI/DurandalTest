import React, { useEffect, useState } from "react";

import Datatable from "../Components/Datatable/DatatableALogs";

import "../SCSS/Elements/_tables.scss"

function AssetLogs() {
  return (

    <div className="list">
      <div className="listContainer">
        <Datatable />
      </div>
    </div>
  );
}

export default AssetLogs;

