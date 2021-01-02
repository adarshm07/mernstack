import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Navbar from "../layout/Navbar";

const AddUser = () => {
  let history = useHistory();
  const [user, setUser] = useState({
    employeeID: "",
    assetID: "",
  });

  const { employeeID, assetID } = user;
  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    axios
      .get(`http://localhost:4000/assets/${assetID}`)
      .then((res) => res.data.stock)
      .then((stock) => {
        if (stock >= 1) {
          axios
            .post("http://localhost:4000/assetsStatus", user)
            .then((res) => res.data.assetID)
            .then((assetID) =>
              axios
                .get(`http://localhost:4000/assets/${assetID}`)
                .then((res) => res)
            )
            .then((res) => {
              var a_id = res.data._id;
              var a_name = res.data.name;
              var a_stock = Number(res.data.stock) - 1;
              var user = {
                name: a_name,
                stock: a_stock,
              };
              axios.post(`http://localhost:4000/assets/${a_id}`, user);
              alert("Stock Updated");
              history.push("/assetsStatus");
            });
          history.push("/assetsStatus");
        } else {
          alert("Stock is 0");
        }
      });
  };
  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="w-75 mx-auto shadow p-5">
          <h2 className="text-center mb-4">Assign Asset</h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="employeeID"
                name="employeeID"
                value={employeeID}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="assetID"
                name="assetID"
                value={assetID}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <button type="submit" className="btn btn-primary btn-block">
              Assign Asset
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
