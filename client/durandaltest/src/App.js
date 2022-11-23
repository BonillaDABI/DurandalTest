import React, { useContext } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css'
import "./Style/dark.scss"

import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Create from "./Pages/Create";
import CreateR from "./Pages/CreateR";
import Update from "./Pages/Update";
import UpdateR from "./Pages/UpdateR";
import ListUsers from "./Pages/ListUsers";
import ListRoles from "./Pages/ListRoles";
import ListPermissions from "./Pages/ListPermissions";
import Recovery from "./Pages/Recovery";
import Clients from "./Pages/Clients";
import Contacts from "./Pages/Contacts";
import Tecnicos from "./Pages/Tecnicos";


import { DarkModeContext } from "./Context/darkModeContext";

function App() {

  const {darkMode} = useContext(DarkModeContext)

  return (
    <div className={darkMode ? "app dark" : "app"}>
    <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/recovery" element={<Recovery />} /> 
          <Route exact path="/dashboard" element={<Dashboard />} /> {/* PENDING */}
          <Route exact path="/clients" element={<Clients />} />
          <Route exact path="/contacts" element={<Contacts />} />
          <Route exact path="/tecnicos" element={<Tecnicos />} />
          <Route exact path="/create" element={<Create />} />
          <Route exact path="/createR" element={<CreateR />} /> {/* PENDING */}
          <Route exact path="/update" element={<Update />} /> 
          <Route exact path="/updateR" element={<UpdateR />} /> {/* PENDING */}
          <Route exact path="/listAll" element={<ListUsers />} /> 
          <Route exact path="/listAllR" element={<ListRoles />} /> 
          <Route exact path="/listAllP" element={<ListPermissions />} /> 
        </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
