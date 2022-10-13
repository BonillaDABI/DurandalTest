import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const SignIn = () => {
  const navigate = useNavigate();
  const [userName, setUser] = useState("");
  const [firstName, setFirst] = useState("");
  const [password, setPW] = useState("");

  const logUser = () => {
    axios.post('http://localhost:3000/login', { // url to POST
      user_name: userName,
      first_name: firstName,
      user_password: password
    })
      .then((response) => {
        localStorage.setItem("token", JSON.stringify(response));
        localStorage.setItem("isAuthenticated", "true");
        console.log(response);
        navigate('/menu');
      }, (error) => {
        console.log(error);
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
          <h3 className="Auth-form-title">DABI Test | Sign In</h3>
          <div className="text-center">
            Not registered yet?{" "}
            <span className="Auth-links" onClick={() => navigate('/')}>
              Sign Up
            </span>
          </div>
          <div className="form-group mt-3">
            <label className="form_input_labels">Username</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Enter username"
              value={userName}
              onChange={(e) => setUser(e.target.value)}
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
      </form>
    </div>
  );
}
export default SignIn;



