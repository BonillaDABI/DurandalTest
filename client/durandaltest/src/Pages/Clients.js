import React from "react";
import Datatable from "../Components/Datatable/DatatableC";

import "../SCSS/Elements/_tables.scss"

function Clients() {
  return (
    <div className="list">
      <div className="listContainer">
        <Datatable />
      </div>
    </div>
  );
}

export default Clients;

