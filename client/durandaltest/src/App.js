import React, { useContext } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css'
import "./Style/dark.scss"

import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Create from "./Pages/Create";
//import CreateR from "./Pages/CreateR";
import Update from "./Pages/Update";
//import UpdateR from "./Pages/UpdateR";
import ListUsers from "./Pages/ListUsers";
import ListRoles from "./Pages/ListRoles";
import ListPermissions from "./Pages/ListPermissions";
import Recovery from "./Pages/Recovery";
import Clients from "./Pages/Clients";
import ClientInfo from "./Pages/ClientInfo";
import Tecnicos from "./Pages/Tecnicos";
import TechLogs from "./Pages/TechLogs";

import { DarkModeContext } from "./Context/darkModeContext";
import SiteLogs from "./Pages/SiteLogs";


function App() {

  const { darkMode } = useContext(DarkModeContext)

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/recovery" element={<Recovery />} />
          <Route exact path="/dashboard" element={<Dashboard />} /> {/* PENDING */}
          <Route exact path="/clients" element={<Clients />} />
          <Route exact path="/clientInfo" element={<ClientInfo />} />
          <Route exact path="/tecnicos" element={<Tecnicos />} />
          <Route exact path="/tecnicosLogs" element={<TechLogs />} />
          <Route exact path="/siteLogs" element={<SiteLogs />} />
          <Route exact path="/create" element={<Create />} />
          <Route exact path="/update" element={<Update />} />
          <Route exact path="/listAll" element={<ListUsers />} />
          <Route exact path="/listAllR" element={<ListRoles />} />
          <Route exact path="/listAllP" element={<ListPermissions />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

/*
<Route exact path="/createR" element={<CreateR />} /> 
<Route exact path="/updateR" element={<UpdateR />} />
<Route exact path="/contacts" element={<Contacts />} />
*/
