import React from "react";

import Sidebar from "../Components/Sidebar/Sidebar";
import Navbar from "../Components/Navbar/Navbar";

import "../SCSS/Elements/_tables.scss"

function ClientInfo() {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <h1>Nombre del cliente</h1>
      </div>
    </div>
  );
}

export default ClientInfo;

