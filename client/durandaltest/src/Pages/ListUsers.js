import {React, useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../Components/Navbar";

function ListUser() { 
  const [data, setData] = useState([]);

  const getData = () => {
    axios.get('http://localhost:3001/listAll')
      .then((response) => {
        console.log(response.data);
        setData(response.data); 
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
    };

    useEffect(() => {
      getData();
    }, []);
      

    return (
      <div className="ListUsers-container">
        <NavBar />
        <h1>ListUsers Test</h1>
        <tbody className="users-table">
          <tr className="head-row">
            <th>Name</th>
            <th>First Surname</th>
            <th>Email</th>
          </tr>
          {data.map((item, index) => (
            <tr key={index} className="table-rows">
              <td>{item.name}</td>
              <td>{item.first_surname}</td>
              <td>{item.email}</td>
            </tr>
          ))}
        </tbody>
      </div>
    );
  }
  export default ListUser;
  


