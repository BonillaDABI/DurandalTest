import { BrowserRouter, Routes, Route } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css'
import Login from "./Views/Login";
import Dashboard from "./Views/Dashboard";
import Create from "./Views/Create";
import Update from "./Views/Update";
import ListUsers from "./Views/ListUsers";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="create" element={<Create />} />
        <Route path="update" element={<Update />} />
        <Route path="listUsers" element={<ListUsers />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
