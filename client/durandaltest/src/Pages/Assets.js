import React from "react";

import NewSidebar from "../Components/ProSidebar/ProSidebar";
import Navbar from "../Components/Navbar/Navbar";
import Datatable from "../Components/Datatable/DatatableAssets";

import "../SCSS/Elements/_tables.scss"

function Assets() {
  return (
      <div className="list">
        <NewSidebar />
        <div className="listContainer">
          <Navbar />
          <Datatable />
        </div>
      </div>
    );
  }

export default Assets;