import React from "react";

import Datatable from "../Components/Datatable/DatatableT";

import "../SCSS/Elements/_tables.scss"

function Tecnicos() {
  return (
      <div className="list">
        <div className="listContainer">
          <Datatable />
        </div>
      </div>
    );
  }

export default Tecnicos;