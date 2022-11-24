import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faGooglePlusG, faWindows } from "@fortawesome/free-brands-svg-icons"
import logo from "../Media/Logos/logo-dabi-line-white.png"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../SCSS/Elements/_footer.scss'
import '../SCSS/Elements/_login.scss'

const Login = () => {
  const successAlert = () => {
    toast.success("Login exitoso. Bienvenido!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,

    });
  }

  const errorAlert = () => {
    toast.error("Los datos ingresados no corresponden a un usuario registrado. Vuelve a intentarlo.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,

    });
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      toast.success("Login exitoso. Bienvenido!");
      navigate('/dashboard')
    }
  })

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPW] = useState("");

  const logUser = () => {
    axios.post('http://localhost:3001/login', { // url to POST
      email: email,
      password: password
    }).then((response) => {
      localStorage.setItem('token', response.data.accessToken);
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("username", response.data.user.name);
      //console.log(response.data.user.name);
      //console.log(response.data.accessToken);
      successAlert();
      setTimeout(() => {
        navigate('/dashboard');
      }, 3600);
      
      //alert("Login exitoso. Bienvenido!");

    }, (error) => {
      errorAlert();
      console.log(error);
      //alert("Los datos ingresados no corresponden a un usuario registrado. Vuelve a intentarlo.");
    });
  }


  /*
  const onSuccess = (res) => {
    console.log('success:', res);
  };
  const onFailure = (err) => {
    console.log('failed:', err);
  };
  */

  return (
    <div id="login-page">
      <ToastContainer />
      <div className="container">
        <div className="form-container login-container">
          <form>
            <img src={logo} id="logo"></img>
            <div className="social-container">
              <a href="#" className="social"><FontAwesomeIcon icon={faWindows} /></a>
              <a href="#" className="social"><FontAwesomeIcon icon={faGooglePlusG} /></a>
            </div>
            <span>o usar tu cuenta</span>
            <input
              type="email" placeholder="E-mail"
              value={email} onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password" placeholder="Contraseña"
              value={password} onChange={(e) => setPW(e.target.value)}
            />
            <a href="/recovery">¿Olvidaste tu contraseña?</a>
            <button type="button" id="login-button" onClick={() => logUser()}>Iniciar sesión</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-right">
              <h1 id="overlay-primary-text">Hola, Bienvenido</h1>
              <p id="overlay-initialp">Optimizamos tus operaciones</p>
              <p id="overlay-primaryp">Generamos ahorros, facilitando la toma de decisiones para tus servicios en campo.</p>
              <button id="overlay-button" ><a href="https://www.dabi.io" target="_blank">más información</a></button>
            </div>
          </div>
        </div>
      </div >
      <footer className="loginFooter">
        <span>
          Design by DABI
        </span>
      </footer>
    </div>
  );
}
export default Login;


