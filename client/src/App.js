import React from "react";
// import './styles.css'
import "./App.css";
import "./styles.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import Employees from "./components/pages/Employees";
import Assets from "./components/pages/Assets";
import AssetsStatus from "./components/pages/AssetsStatus";
import Navbar from "./components/layout/Navbar";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from "react-router-dom";
import NotFound from "./components/pages/NotFound";

import AddUser from "./components/users/AddUser";
import AddAsset from "./components/assets/AddAsset";
import AssignAsset from "./components/assetsStatus/AssignAsset";

import EditAsset from './components/assets/EditAsset'


import EditUser from "./components/users/EditUser";
import User from "./components/users/User";
import Login from "./components/pages/Login";



function App(props) {
  return (
    <Router>
      <div className="App">
        
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/employees" component={Employees} />
         
          <Route exact path="/assets" component={Assets} />
          <Route exact path="/assetsStatus" component={AssetsStatus} />

          <Route exact path="/users/add" component={AddUser} />
          <Route exact path="/assets/add" component={AddAsset} />
          <Route exact path="/assetStatus/assign" component={AssignAsset} />


          <Route exact path="/users/edit/:id" component={EditUser} />
          <Route exact path="/assets/edit/:id" component={EditAsset} />
          <Route exact path="/users/:id" component={User} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
