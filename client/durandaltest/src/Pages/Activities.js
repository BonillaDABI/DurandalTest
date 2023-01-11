import React from "react";

import Datatable from "../Components/Datatable/DatatableAct";

import "../SCSS/Elements/_tables.scss"

function Activities() {
  return (

    <div className="list">
      <div className="listContainer">
        <Datatable />
      </div>
    </div>
  );
}

export default Activities;