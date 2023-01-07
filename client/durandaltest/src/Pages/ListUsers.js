import React from "react";

import Datatable from "../Components/Datatable/DatatableU";

import "../SCSS/Elements/_tables.scss"

function ListUser() {
  return (
      <div className="list">
        <div className="listContainer">
          <Datatable />
        </div>
      </div>
    );
  }

export default ListUser;