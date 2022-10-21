import NavBar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react"


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
      <h1>Dashboard Test</h1>
    </div>
  );
}

export default Dashboard