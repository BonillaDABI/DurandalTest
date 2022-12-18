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
import SiteLogs from "./Pages/SiteLogs";
import Assets from "./Pages/Assets";
import Activities from "./Pages/Activities";
import Equipments from "./Pages/Equipments";
import Items from "./Pages/Items";
import Visits from "./Pages/Visits";


import { DarkModeContext } from "./Context/darkModeContext";


function App() {

  const { darkMode } = useContext(DarkModeContext)

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/recovery" element={<Recovery />} />
          <Route exact path="/listAll" element={<ListUsers />} />
          <Route exact path="/dashboard" element={<Dashboard />} /> {/* PENDING */}
          <Route exact path="/clients" element={<Clients />} />
          <Route exact path="/clients/clientInfo" element={<ClientInfo />} />
          <Route exact path="/tecnicos" element={<Tecnicos />} />
          <Route exact path="/tecnicos/tecnicosLogs" element={<TechLogs />} />
          <Route exact path="/siteLogs" element={<SiteLogs />} />

          <Route exact path="/assets" element={<Assets />} /> 
          <Route exact path="/activities" element={<Activities />} /> 
          <Route exact path="/equipments" element={<Equipments />} /> 
          <Route exact path="/items" element={<Items />} /> 
          <Route exact path="/visits" element={<Visits />} /> 

          {/* <Route exact path="/create" element={<Create />} />
          <Route exact path="/update" element={<Update />} />
          <Route exact path="/listAllR" element={<ListRoles />} />
          <Route exact path="/listAllP" element={<ListPermissions />} /> */}
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
