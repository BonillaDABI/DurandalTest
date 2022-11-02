//import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//import axios from "axios";

import "../SCSS/Elements/_recovery.scss"
import '../SCSS/Elements/_footer.scss'

const Recovery = () => {
    const navigate = useNavigate();

    const recoveryPW = () => {
        navigate('/');
        alert("Se ha enviado el proceso de recuperación al correo ingresado.");
    }

    return (
      <div className="Recovery-container">
        <p className="recovery-p">
          Ingresa el e-mail asociado a tu cuenta y <br></br>te enviaremos un link para restablecer tu contraseña
        </p>
        <div className="recovery-input">
            <input
                type="email"
                className="input-field"
                placeholder="E-mail"
            />
        </div>
        <div className="rec-button-container">
            <button className="rec-button" type="button" onClick={() => recoveryPW()}>
              Enviar
            </button>
        </div>
        <footer>
        <span>
          Design by DABI
        </span>
      </footer>
      </div>
    );
  }
  export default Recovery;
  


