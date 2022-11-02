import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook ,faFacebookF,faGoogle, faGooglePlus, faGooglePlusG } from "@fortawesome/free-brands-svg-icons"
import logo from "../Media/Logos/logo-dabi-line-white.png"

import '../SCSS/Elements/_footer.scss'
import '../SCSS/Elements/_login.scss'

const Login = () => {

  useEffect(() => {
    if (localStorage.getItem('token')) {
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
      localStorage.setItem('token', response.data);
      localStorage.setItem("isAuthenticated", "true");
      console.log(response);
      navigate('/dashboard');
      alert("Login exitoso. Bienvenido!");

    }, (error) => {
      console.log(error);
      alert("Los datos ingresados no corresponden a un usuario registrado. Vuelve a intentarlo.");
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
      <div className="container">
        <div className="form-container login-container">
          <form>
            <img src={logo} id="logo"></img>
            <div className="social-container">
              <a href="#" className="social"><FontAwesomeIcon icon={faFacebookF} /></a>
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
      <footer>
        Design by DABI
      </footer>
    </div>
  );
}
export default Login;


