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
      <SideBar>
        <h1>Dashboard Test</h1>
      </SideBar>
  );
}

export default Dashboard