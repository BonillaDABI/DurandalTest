import { BrowserRouter, Routes, Route } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css'

import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Create from "./Pages/Create";
import Update from "./Pages/Update";
import ListUsers from "./Pages/ListUsers";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route exact path="/dashboard" element={<Dashboard />} /> {/* PENDING */}
          <Route exact path="/create" element={<Create />} />
          <Route exact path="/update" element={<Update />} /> {/* PENDING */}
          <Route exact path="/listAll" element={<ListUsers />} /> {/* PENDING */}
        </Routes>
    </BrowserRouter>
  );
}

export default App;
