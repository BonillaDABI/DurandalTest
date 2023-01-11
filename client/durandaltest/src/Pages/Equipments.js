import React from "react";

import Datatable from "../Components/Datatable/DatatableEquip";

import "../SCSS/Elements/_tables.scss"

function Equipments() {
  return (

    <div className="list">
      <div className="listContainer">
        <Datatable />
      </div>
    </div>
  );
}

export default Equipments;