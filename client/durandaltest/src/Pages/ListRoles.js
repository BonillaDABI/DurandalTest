import React from "react";


import "../SCSS/Elements/_design.scss"
import NewSidebar from "../Components/ProSidebar/ProSidebar";
import Navbar from "../Components/Navbar/Navbar";
import Datatable from "../Components/Datatable/DatatableR";

import "../SCSS/Elements/_tables.scss"

function ListRoles() {
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
  export default ListRoles;
  


