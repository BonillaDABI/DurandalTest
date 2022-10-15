import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPW] = useState("");

  const logUser = () => {
    axios.post('http://localhost:3001/login', { // url to POST
      email: email,
      password: password
    }).then((response) => {
      localStorage.setItem("token", JSON.stringify(response));
      localStorage.setItem("isAuthenticated", "true");
      console.log(response);

    }, (error) => {
      console.log(error);
    });
    navigate('/dashboard');
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
            <button type="submit" id="Auth-button" className="btn btn-primary" onClick={() => logUser()}>
              Login
            </button>
          </div>
          <p className="text-center mt-2">
            <a className="Auth-links" href="#">Forgot password?</a>
          </p>
        </div>
      </form >
    </div >
  );
}
export default Login;



