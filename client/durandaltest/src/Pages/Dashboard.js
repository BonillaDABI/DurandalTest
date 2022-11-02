import NavBar from "../Components/Navbar";
import SideBar from "../Components/Sidebar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react"

import "../SCSS/Elements/_dashboard.scss"

const Dashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/')
    }
  })

  return (
    <div className="Dashboard-container">
      <NavBar />
    </div>
  );
}

export default Dashboard