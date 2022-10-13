import { BrowserRouter, Routes, Route } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css'
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import Menu from "./Components/Menu";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/menu" element={<Menu />} />          
      </Routes>
    </BrowserRouter>
  );
}

export default App;
