import React from "react";

import NewSidebar from "../Components/ProSidebar/ProSidebar";
import Navbar from "../Components/Navbar/Navbar";
import Datatable from "../Components/Datatable/DatatableT";

import "../SCSS/Elements/_tables.scss"

function Tecnicos() {
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

export default Tecnicos;