import React from "react";

import NewSidebar from "../Components/ProSidebar/ProSidebar";
import Navbar from "../Components/Navbar/Navbar";
import Datatable from "../Components/Datatable/DatatableCC";

import "../SCSS/Elements/_tables.scss"

function Contacts() {
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

export default Contacts;

