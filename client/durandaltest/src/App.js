import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css'

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

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/recovery" element={<Recovery />} /> {/* PENDING */}
          <Route exact path="/dashboard" element={<Dashboard />} /> {/* PENDING */}
          <Route exact path="/create" element={<Create />} />
          <Route exact path="/createR" element={<CreateR />} /> {/* PENDING */}
          <Route exact path="/update" element={<Update />} /> 
          <Route exact path="/updateR" element={<UpdateR />} /> {/* PENDING */}
          <Route exact path="/listAll" element={<ListUsers />} /> {/* PENDING */}
          <Route exact path="/listAllR" element={<ListRoles />} /> {/* PENDING */}
          <Route exact path="/listAllP" element={<ListPermissions />} /> {/* PENDING */}
        </Routes>
    </BrowserRouter>
  );
}

export default App;
