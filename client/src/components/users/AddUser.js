import React, { useState } from "react";
import axios from 'axios'
import { useHistory } from "react-router-dom";
import Navbar from "../layout/Navbar";

const AddUser = () => {
  let history = useHistory();
  const [user, setUser] = useState({
    name: "",
    email: "",
    profession: ""
  });

  const { name, email, profession } = user;
  const onInputChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    await axios.post("http://localhost:4000/employees", { name, email, profession });
    history.push("/employees");
  };
  return (
    <div>
      <Navbar/>
      <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Add A User</h2>
        <form onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Name"
              name="name"
              value={name}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control form-control-lg"
              placeholder="Email"
              name="email"
              value={email}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Profession"
              name="profession"
              value={profession}
              onChange={e => onInputChange(e)}
            />
          </div>
          
          <button type='submit' className="btn btn-primary btn-block">Add Employee</button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default AddUser;
