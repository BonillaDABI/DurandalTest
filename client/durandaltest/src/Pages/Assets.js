import React from "react";

import Datatable from "../Components/Datatable/DatatableAssets";

import "../SCSS/Elements/_tables.scss"

function Assets() {
  return (

    <div className="list">
      <div className="listContainer">
        <Datatable />
      </div>
    </div>
  );
}

export default Assets;