import {React, useEffect, useState } from "react";
import axios from "axios";
import SideBar from "../Components/Sidebar";


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

function ListRoles() { 
  const [data, setData] = useState([]);

  const getData = () => {
    axios.get('http://localhost:3001/roles')
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
      <SideBar>
        <h1>ListRoles Test</h1>
        <tbody className="users-table">
          <tr className="head-row">
            <th>Id</th>
            <th>Role</th>
            <th>Delete</th>
          </tr>
          {data.map((item, index) => (
            <tr key={index} className="table-rows">
              <td>{item.id}</td>
              <td>{item.role_name}</td>
              <td>
                <button>
                  <FontAwesomeIcon icon={faTrashCan} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </SideBar>
    );
  }
  export default ListRoles;
  


