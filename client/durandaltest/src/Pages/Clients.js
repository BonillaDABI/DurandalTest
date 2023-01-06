import React from "react";

import NewSidebar from "../Components/ProSidebar/ProSidebar";
import Navbar from "../Components/Navbar/Navbar";
import Datatable from "../Components/Datatable/DatatableC";

import "../SCSS/Elements/_tables.scss"

function Clients() {
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

export default Clients;

