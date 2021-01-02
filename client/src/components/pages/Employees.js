import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import Navbar from "../layout/Navbar";
import DataTable, { createTheme } from 'react-data-table-component';

const Home = () => {
  let history = useHistory();
  const [users, setUser] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:4000/employees");
    setUser(result.data.reverse());
  };

  const deleteUser = async (empID) => {
    axios.get(`http://localhost:4000/assetsStatus/employeeID/${empID}`)
    .then(res => {
      if(res.data.length>0){
          
          var x = res.data.length
          axios.get(`http://localhost:4000/assets/${res.data[0].assetID}`)
          .then(res => {
              
              var a_id    = res.data._id;
              var a_name  = res.data.name;
              var a_stock = Number(res.data.stock) + x;
              var user = {
                name: a_name,
                stock: a_stock
              }
              axios.post(`http://localhost:4000/assets/${a_id}`, user)
              .then(axios.delete(`http://localhost:4000/employees/${empID}`));
              
          })
          loadUsers()
      }
      else{
        axios.delete(`http://localhost:4000/employees/${empID}`);
        loadUsers()
        
      }
    })
    .catch(err => alert(err))

      // await axios.delete(`http://localhost:4000/employees/${empID}`);
    
  };

  return (
   <div>
     <Navbar/>
     <div className="container">
      <div className="py-4">
        <h1>All Employees</h1>
        <Link className="btn btn-outline-light bg-info" to="/users/add">Add Employee</Link>
        <table class="table border shadow">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">EmployeeID</th>
              <th scope="col">Employee Name</th>
              <th scope="col">Email</th>
              <th scope="col">Profession</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.profession}</td>
                <td>
                <Link class="btn btn-primary mr-2" to={`#`}>
                  View
                </Link>
                
                  <Link
                    class="btn btn-outline-primary mr-2"
                    to={`/users/edit/${user._id}`}
                  >
                    Edit
                  </Link>
                  <Link
                    class="btn btn-danger"
                    onClick={() => deleteUser(user._id)}
                  >
                    Delete
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
   </div>
  );
};

export default Home;
