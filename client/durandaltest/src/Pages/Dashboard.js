import { useNavigate } from "react-router-dom";
import { useEffect } from "react"

//import { ToastContainer, toast } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';

import "../SCSS/Elements/_design.scss"

const Dashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/')
    }
  })

  return (
    <div className="home">
      <div className="homeContainer">
          <div className="content">
            <h1>Dashboard Test</h1>
          </div>
      </div>
    </div>
  );
}

export default Dashboard