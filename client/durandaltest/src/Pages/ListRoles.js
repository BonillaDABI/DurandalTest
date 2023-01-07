import React from "react";


import "../SCSS/Elements/_design.scss"
import Datatable from "../Components/Datatable/DatatableR";

import "../SCSS/Elements/_tables.scss"

function ListRoles() {
  return (
      <div className="list">
        <div className="listContainer">
          <Datatable />
        </div>
      </div>
    );
  }
  export default ListRoles;
  


