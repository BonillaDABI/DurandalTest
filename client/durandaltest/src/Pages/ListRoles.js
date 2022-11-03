import React from "react";


import "../SCSS/Elements/_design.scss"
import Sidebar from "../Components/Sidebar/Sidebar";
import Navbar from "../Components/Navbar/Navbar";
import Datatable from "../Components/Datatable/DatatableR";

import "../SCSS/Elements/_tables.scss"

function ListRoles() {
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
  export default ListRoles;
  


