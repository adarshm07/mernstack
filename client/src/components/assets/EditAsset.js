import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import Navbar from "../layout/Navbar";

const EditUser = () => {
  let history = useHistory();
  const { id } = useParams();
  const [user, setUser] = useState({
    name: "",
    stock: 0
  });

  const { name, stock } = user;
  const onInputChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadUser();
  }, []);

  const onSubmit = async e => {
    e.preventDefault();
    await axios.post(`http://localhost:4000/assets/${id}`, user);
    history.push("/assets");
  };

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:4000/assets/${id}`);
    setUser(result.data);
  };
  return (
    <div>
      <Navbar/>
      <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Edit Asset</h2>
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
              type="number"
              className="form-control form-control-lg"
              placeholder="Stock"
              name="stock"
              value={stock}
              onChange={e => onInputChange(e)}
            />
          </div>
         
          <button  type="submit" className="btn btn-warning btn-block">Update Asset</button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default EditUser;
