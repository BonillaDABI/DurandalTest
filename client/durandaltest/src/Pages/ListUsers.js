import React from "react";

import Sidebar from "../Components/Sidebar/Sidebar";
import Navbar from "../Components/Navbar/Navbar";
import Datatable from "../Components/Datatable/DatatableU";

import "../SCSS/Elements/_tables.scss"

function ListUser() {
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

export default ListUser;