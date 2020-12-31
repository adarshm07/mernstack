import React,{useState, useEffect} from "react";
import axios from 'axios'
import { Link } from "react-router-dom";
import Navbar from "../layout/Navbar";

const Contact = () => {
  const [users, setUser] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:4000/assetsStatus");
    setUser(result.data.reverse());
  };

  const deleteUser = async id => {
    await axios.delete(`http://localhost:4000/assetsStatus/${id}`);
    loadUsers();
  };
  return (
    <div>
      <Navbar/>
    <div className="container">
    <div className="py-4">
      <h1>Asset History</h1>
      <Link className="btn btn-outline-light bg-info" to="/assetStatus/assign">Assign Asset</Link>
      <table class="table border shadow">
        <thead class="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">EmployeeID</th>
            <th scope="col">AssetID</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr>
              <th scope="row">{index + 1}</th>
              <td>{user.employeeID}</td>
              <td>{user.assetID}</td>
              
              <td>
                {/* <Link class="btn btn-primary mr-2" to={`/users/${user._id}`}>
                  View
                </Link> */}
                {/* <Link
                  class="btn btn-outline-primary mr-2"
                  to={`/users/edit/${user.id}`}
                >
                  Edit
                </Link> */}
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

export default Contact;
