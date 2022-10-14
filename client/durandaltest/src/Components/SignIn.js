import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPW] = useState("");
  //const [firstName, setFirst] = useState("");

  //const [loginStatus, setLoginStatus] = useState("");

  const logUser = () => {
    axios.post('http://localhost:3001/login', { // url to POST
      email: email,
      user_password: password
    }).then((response) => {
      localStorage.setItem("token", JSON.stringify(response));
      localStorage.setItem("isAuthenticated", "true");
      console.log(response);

    }, (error) => {
      console.log(error);
    });
    navigate('/menu');
  }

  /*.then((response) => {
      if (response.data.message) {
        setLoginStatus(response.data.message)
      } else {
        setLoginStatus(response.data[0].email)
      }
    })*/
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
export default SignIn;



