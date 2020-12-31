import React,{useState, useEffect} from "react";
import axios from 'axios'
import { Link,useHistory } from "react-router-dom";
import Navbar from "../layout/Navbar";

const About = () => {
  let history = useHistory();
  const [users, setUser] = useState([]);
  

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:4000/assets");
    setUser(result.data.reverse());
  };

  const deleteUser = async id => {
    const result1 = await axios.get(`http://localhost:4000/assets/${id}`);
    const assetID = result1.data._id;
    alert(assetID)
    axios.get(`http://localhost:4000/assetsStatus/${assetID}`)
    .then(result2 =>  {
      if(result2.data.length>0){ 
        axios.delete(`http://localhost:4000/assetsStatus/${result2.data[0]._id}`)
        .then(axios.delete(`http://localhost:4000/assets/${id}`))
        .then(loadUsers())
      }
      else{
        axios.delete(`http://localhost:4000/assets/${id}`)
        .then(loadUsers())
      }
    })
    // .then(x => {
    //   axios.delete(`http://localhost:4000/assetsStatus/${x}`)
    // })
    // .then(axios.delete(`http://localhost:4000/assets/${id}`))
    // .then(loadUsers())
  };
  return (
    <div>
      <Navbar/>
    <div className="container">
    <div className="py-4">
      <h1>All Assets</h1>
      <Link className="btn btn-outline-light bg-info" to="/assets/add">Add Asset</Link>
      <table class="table border shadow">
        <thead class="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">assetID</th>
            <th scope="col">Asset Name</th>
            <th scope="col">Stock</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr>
              <th scope="row">{index + 1}</th>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.stock}</td>
              
              <td>
                <Link class="btn btn-primary mr-2" to={`#`}>
                  View
                </Link>
                <Link
                  class="btn btn-outline-primary mr-2"
                  to={`/assets/edit/${user._id}`}
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

export default About;
