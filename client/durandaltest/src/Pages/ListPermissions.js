import {React, useEffect, useState } from "react";
import axios from "axios";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

import "../SCSS/Elements/_design.scss"
import Sidebar from "../Components/Sidebar/Sidebar";
import Navbar from "../Components/Navbar/Navbar";


function ListPermissions() { 
  const [data, setData] = useState([]);

  const getData = () => {
    axios.get('http://localhost:3001/permissions')
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
      
    const deleteData = () => {
      
    }

    return (
      <div className="home">
        <Sidebar />
        <div className="homeContainer">
          <Navbar />
          <div className="content">
            <h1>ListPermissions Test</h1>
              <tbody className="users-table">
                <tr className="head-row">
                  <th>Id</th>
                  <th>Permission</th>
                  <th>Delete</th>
                </tr>
                {data.map((item, index) => (
                  <tr key={index} className="table-rows">
                    <td>{item.id}</td>
                    <td>{item.per_name}</td>
                    <td>
                      <button>
                        <FontAwesomeIcon icon={faTrashCan} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </div>
        </div>
      </div>
    );
  }
  export default ListPermissions;
  


