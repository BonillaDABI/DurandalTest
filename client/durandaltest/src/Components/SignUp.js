import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const SignUp = () => {
  const navigate = useNavigate();
  const [userName, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirst] = useState("");
  const [firstSurname, setFirstSurname] = useState("");
  const [secondSurname, setSecondSurname] = useState("");
  const [password, setPW] = useState("");

  const createAccount = () => {
    axios.post('http://localhost:3001/register', { // url to POST
      user_name: userName,
      first_name: firstName,
      first_surname: firstSurname,
      second_surname: secondSurname,
      email: email,
      user_password: password

    })
      .then((response) => {
        console.log(response);
      }, (error) => {
        console.log(error);
      });
    navigate('/signin', { state: { first_name: firstName } });
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
          <h3 className="Auth-form-title">DABI Test | Sign Up</h3>
          <div className="text-center">
            Already registered?{" "}
            <span className="Auth-links" onClick={() => navigate('/signin', { state: { user_name: userName } })}>
              Sign In
            </span>
          </div>
          <div className="form-group mt-3">
            <label className="form_input_labels">Username</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="e.g MikeBR"
              value={userName}
              onChange={(e) => setUser(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label className="form_input_labels">Name</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="e.g Miguel"
              value={firstName}
              onChange={(e) => setFirst(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label className="form_input_labels">First Surname</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="e.g Bermea"
              value={firstSurname}
              onChange={(e) => setFirstSurname(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label className="form_input_labels">Second Surname</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="e.g Rodriguez"
              value={secondSurname}
              onChange={(e) => setSecondSurname(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label className="form_input_labels">Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label className="form_input_labels">Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              value={password}
              onChange={(e) => setPW(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" id="Auth-button" className="btn btn-primary" onClick={() => createAccount()}>
              Create
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
export default SignUp;



