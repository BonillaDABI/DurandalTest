import React, { useContext } from "react";

import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom"
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
import AssetLogs from "./Pages/AssetLogs";
import VisitLogs from "./Pages/VisitLogs";
import EquipLogs from "./Pages/EquipLogs";

import { DarkModeContext } from "./Context/darkModeContext";
import EquipAttr from "./Pages/EquipAttr";
import NewSidebar from "./Components/ProSidebar/ProSidebar";
import Navbar from "./Components/Navbar/Navbar";
import SiteAssets from "./Pages/SiteAssets";


function App() {

  const { darkMode } = useContext(DarkModeContext)

  const Layout = () => (
    <>
      <div className={darkMode ? "app dark" : "app"}>
      <div className="app">
        <NewSidebar />
        <main className="content">   
            <Navbar />
            <Outlet className="page-content" />
        </main>   
      </div>
    </div>
    </>
  )

  return (
    <Routes>
      <Route element={<Layout />}>       
        <Route exact path="/listAll" element={<ListUsers />} />
        <Route exact path="/dashboard" element={<Dashboard />} /> {/* PENDING */}
        <Route exact path="/clients" element={<Clients />} />
        <Route exact path="/clients/clientInfo" element={<ClientInfo />} />
        <Route exact path="/clients/clientInfo/siteAssets" element={<SiteAssets />} />
        <Route exact path="/tecnicos" element={<Tecnicos />} />

        <Route exact path="/tecnicos/tecnicosLogs" element={<TechLogs />} />
        <Route exact path="/siteLogs" element={<SiteLogs />} />
        <Route exact path="/assetLogs" element={<AssetLogs />} />
        <Route exact path="/visitLogs" element={<VisitLogs />} />
        <Route exact path="/equipLogs" element={<EquipLogs />} />

        <Route exact path="/assets" element={<Assets />} /> 
        <Route exact path="/activities" element={<Activities />} /> 
        <Route exact path="/equipments" element={<Equipments />} /> 
        <Route exact path="/equipmentAttr" element={<EquipAttr />} /> 
        <Route exact path="/items" element={<Items />} /> 
        <Route exact path="/visits" element={<Visits />} />
        
        <Route path='*' element={<>not found</>}/> 
      </Route>
      <Route exact path="/" element={<Login />} />
      <Route exact path="/recovery" element={<Recovery />} />
    </Routes>
  );
}

export default App;

/*
<Route exact path="/createR" element={<CreateR />} /> 
<Route exact path="/updateR" element={<UpdateR />} />
<Route exact path="/contacts" element={<Contacts />} />
*/
