import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react"

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
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">DABI Durandal | Login</h3>
          <div className="form-group mt-3">
            <label className="form_input_labels">Email</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label className="form_input_labels">Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPW(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="button" id="Auth-button" className="btn btn-primary" onClick={() => logUser()}>
              Login
            </button>
          </div>
          <p className="text-center mt-2">
            <a className="Auth-links" href="/recovery">Forgot password?</a>
          </p>
        </div>
      </form >
    </div >
  );
}
export default Login;



