import React from "react";

import Datatable from "../Components/Datatable/DatatableVisits";

import "../SCSS/Elements/_tables.scss"

function Visits() {
  return (
      <div className="list">
        <div className="listContainer">
          <Datatable />
        </div>
      </div>
    );
  }

export default Visits;