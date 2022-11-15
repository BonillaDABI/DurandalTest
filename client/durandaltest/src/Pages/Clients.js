import React from "react";

import Sidebar from "../Components/Sidebar/Sidebar";
import Navbar from "../Components/Navbar/Navbar";
import Datatable from "../Components/Datatable/DatatableC";

import "../SCSS/Elements/_tables.scss"

function Clients() {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <Datatable />
      </div>
    </div>
  );
}

export default Clients;

