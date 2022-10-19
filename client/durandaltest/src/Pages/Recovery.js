//import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//import axios from "axios";


const Recovery = () => {
    const navigate = useNavigate();

    const recoveryPW = () => {
        navigate('/');
        alert("Se ha enviado el proceso de recuperación al correo ingresado.");
    }

    return (
      <div className="Recovery-container">
        <div className="input-container">
            <input
                type="email"
                className="input-field"
                placeholder="Type the email of your account"
            />
        </div>
        <div className="rec-button-container">
            <button className="rec-button" type="button" onClick={() => recoveryPW()}>
              Send email
            </button>
        </div>
      </div>
    );
  }
  export default Recovery;
  


