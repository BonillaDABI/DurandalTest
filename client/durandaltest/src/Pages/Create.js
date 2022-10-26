import React, { useState } from "react";
//import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "../Components/Navbar";

const Create = () => {
  //const navigate = useNavigate();
  //const [userName, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [firstSurname, setFirstSurname] = useState("");
  const [secondSurname, setSecondSurname] = useState("");
  const [password, setPW] = useState("");

  const createUser = () => {
    axios.post('http://localhost:3001/register', { // url to POST
      //user_name: userName,
      'Authorization': "bearer " + localStorage.getItem('token'),
      name: name,
      first_surname: firstSurname,
      second_surname: secondSurname,
      email: email,
      password: password

    })
      .then((response) => {
        console.log(response);
        alert("Usuario creado exitosamente en la base de datos.");
      }, (error) => {
        console.log(error);
        alert("Error al crear usuario. Vuelve a intentarlo.");
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
    <div className="cu-container">
      <NavBar />
      <div className="cu-content-container">
        <form className="cu-form">
          <h1 className="title">DABI Durandal | Create - Users</h1>
          <div className="input-container">
            <label className="input-label">Name</label>
            <input
              type="text"
              className="input-field"
              placeholder="e.g Miguel"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="input-container">
            <label className="input-label">First Surname</label>
            <input
              type="text"
              className="input-field"
              placeholder="e.g Bermea"
              value={firstSurname}
              onChange={(e) => setFirstSurname(e.target.value)}
            />
          </div>

          <div className="input-container">
            <label className="input-label">Second Surname</label>
            <input
              type="text"
              className="input-field"
              placeholder="e.g Rodriguez"
              value={secondSurname}
              onChange={(e) => setSecondSurname(e.target.value)}
            />
          </div>

          <div className="input-container">
            <label className="input-label">Email address</label>
            <input
              type="email"
              className="input-field"
              placeholder="Enter the email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-container">
            <label className="input-label">Password</label>
            <input
              type="password"
              className="input-field"
              placeholder="Enter the password"
              value={password}
              onChange={(e) => setPW(e.target.value)}
            />
          </div>
          <div className="cu-button-container">
            <button className="cu-button" type="submit" onClick={() => createUser()}>
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Create;



