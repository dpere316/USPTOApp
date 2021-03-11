// Import Helpers
import React, { useState } from 'react';
import { Switch, Route,Redirect } from "react-router-dom";

// Imports of Components here
import Home from './components/Home/Home';
import Navbar from './components/NavigationBar/navBar';
import ViewPatent from './components/PatentPage/PatentView';
import DashBoard from './components/Dashboard/dashboard';
import SignUp from './components/Signup/signup';
import Login from './components/Login/Login';
import ViewUser from './components/Dashboard/Pages/viewUser';
import Logout from './components/Logout/Logout';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

// Import Styles
import './App.css';


const App = () => {
  
  // Set this into state using react hooks
  const [Auth] = useState(window.localStorage.getItem("isAuthenticated"))
  
  // const ISAUTHENTICATED = window.localStorage.getItem("isAuthenticated");

  return (
    <div>
        <Navbar isAuthed = {Auth}/>
        <Switch>
          <Redirect exact from="/" to="/Home" />
          <Route exact path="/Home" render ={Home}/>
          <Route path="/Signup" render={(props) => <SignUp {...props} />} />
          <Route path="/Login" render={(props) => <Login {...props} />} />
          <Route exact path="/Logout" render={(props) => <Logout {...props} />} />
          <ProtectedRoute exact path="/Patents"   isAuthed = {Auth} component = {ViewPatent}/> 
          <ProtectedRoute exact path='/dashboard' isAuthed = {Auth} component= {DashBoard} />
          <ProtectedRoute exact path="/Dashboard/ViewUser" isAuthed = {Auth} component={ViewUser} />
        </Switch>
      </div>
  );
};

export default App;

