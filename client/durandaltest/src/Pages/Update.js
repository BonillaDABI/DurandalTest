import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "../Components/Navbar";

const Create = () => {
  const navigate = useNavigate();
  //const [userName, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [firstSurname, setFirstSurname] = useState("");
  const [secondSurname, setSecondSurname] = useState("");
  const [password, setPW] = useState("");

  const updateUser = () => {
    axios.patch('http://localhost:3001/update', { // url to POST
      //user_name: userName,
      name: name,
      first_surname: firstSurname,
      second_surname: secondSurname,
      email: email,
      password: password

    })
      .then((response) => {
        console.log(response);
        alert("Usuario actualizado exitosamente en la base de datos.");
      }, (error) => {
        console.log(error);
        alert("Error al actualizar datos del usuario. Vuelve a intentarlo.");
      });
    navigate('/signin', { state: { name: name } });
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
          <h1 className="title">DABI Durandal | Update - Users</h1>
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
              placeholder="Enter the new email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-container">
            <label className="input-label">Password</label>
            <input
              type="password"
              className="input-field"
              placeholder="Enter the new password"
              value={password}
              onChange={(e) => setPW(e.target.value)}
            />
          </div>
          <div className="cu-button-container">
            <button className="cu-button" type="submit" onClick={() => updateUser()}>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Create;



