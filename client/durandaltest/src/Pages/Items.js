import React from "react";
import Datatable from "../Components/Datatable/DatatableItems";

import "../SCSS/Elements/_tables.scss"

function Items() {
  return (
      <div className="list">
        <div className="listContainer">
          <Datatable />
        </div>
      </div>
    );
  }

export default Items;