import React from "react";

import "../SCSS/Elements/_design.scss"
import Datatable from "../Components/Datatable/DatatableP";

import "../SCSS/Elements/_tables.scss"

function ListPermissions() { 
  return (
    <div className="list">
      <div className="listContainer">
        <Datatable />
      </div>
    </div>
  );
}
  export default ListPermissions;
  


