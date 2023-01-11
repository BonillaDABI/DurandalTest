import React from "react";

import Datatable from "../Components/Datatable/DatatableCC";

import "../SCSS/Elements/_tables.scss"

function Contacts() {
  return (

    <div className="list">
      <div className="listContainer">
        <Datatable />
      </div>
    </div>
  );
}

export default Contacts;

